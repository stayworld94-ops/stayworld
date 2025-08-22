<script type="module">
import { auth, db } from "/js/app.js";
import {
  collection, addDoc, serverTimestamp, doc, updateDoc, getDoc, query, where, getDocs, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// [예약하기] 버튼 핸들러
export const bookNow = async (opts) => {
  // opts: {listingId, listingTitle, checkIn, checkOut, guests, priceTotal, currency}
  const user = auth.currentUser;
  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }

  // 간단 유효성 체크
  if (!opts.listingId || !opts.checkIn || !opts.checkOut || !opts.guests) {
    alert("입력값을 확인하세요.");
    return;
  }

  // (예시) 무료취소 마감 시한: 체크인 48시간 전
  const freeCancelHours = 48;

  // Firestore에 예약 생성
  const ref = await addDoc(collection(db, "bookings"), {
    user_id: user.uid,
    user_email: user.email,
    listing_id: opts.listingId,
    listing_title: opts.listingTitle || "",
    check_in: opts.checkIn,        // ISO(YYYY-MM-DD)
    check_out: opts.checkOut,
    guests: Number(opts.guests),
    price_total: Number(opts.priceTotal || 0),
    currency: opts.currency || "TRY",
    status: "confirmed",           // (결제 연동 전이면 'pending'으로 두고 결제 성공 후 'confirmed'로 업데이트)
    created_at: serverTimestamp(),
    canceled_at: null,
    refund_amount: 0,
    policy: {
      free_cancel_hours: freeCancelHours,
      fee_rate_after_free_window: 0.1 // 예: 무료취소 마감 이후 취소 시 10% 수수료
    }
  });

  alert("예약이 완료되었습니다. (마이페이지에서 확인 가능)");
  return ref.id;
};

// [예약취소] 버튼 핸들러
export const cancelBooking = async (bookingId) => {
  const user = auth.currentUser;
  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }
  if (!confirm("정말 예약을 취소하시겠습니까?")) return;

  const ref = doc(db, "bookings", bookingId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    alert("예약을 찾을 수 없습니다.");
    return;
  }

  const b = snap.data();
  if (b.user_id !== user.uid) {
    alert("내 예약만 취소할 수 있습니다.");
    return;
  }
  if (b.status === "canceled") {
    alert("이미 취소된 예약입니다.");
    return;
  }

  // 환불 계산 로직 (간단 예시)
  const now = new Date();
  const checkIn = new Date(b.check_in + "T00:00:00");
  const diffHours = (checkIn - now) / 36e5; // 남은 시간(시)

  let refund = 0;
  if (diffHours >= (b.policy?.free_cancel_hours ?? 48)) {
    // 무료취소 기간 내 → 전액 환불
    refund = Number(b.price_total || 0);
  } else {
    // 무료취소 기간 지남 → 수수료 공제
    const rate = b.policy?.fee_rate_after_free_window ?? 0.1;
    refund = Math.max(0, Number(b.price_total || 0) * (1 - rate));
  }

  await updateDoc(ref, {
    status: "canceled",
    canceled_at: serverTimestamp(),
    refund_amount: Math.round(refund)
  });

  // TODO: Stripe/결제 연동 시 실제 환불 API 호출 필요
  alert(`예약이 취소되었습니다. 환불 예정 금액: ${refund}${b.currency || "TRY"}`);
};

// [마이페이지] 내 예약 목록 로드 & 렌더
export const loadMyBookings = async (containerSelector = "#my-bookings") => {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "bookings"),
    where("user_id", "==", user.uid),
    orderBy("created_at", "desc")
  );
  const snap = await getDocs(q);

  const box = document.querySelector(containerSelector);
  if (!box) return;

  box.innerHTML = "";
  snap.forEach(docSnap => {
    const d = docSnap.data();
    const item = document.createElement("div");
    item.className = "booking-item";
    item.innerHTML = `
      <div class="booking-row">
        <div>
          <div class="title">${d.listing_title || "(숙소)"}</div>
          <div class="meta">${d.check_in} → ${d.check_out} · 게스트 ${d.guests}명</div>
          <div class="meta">상태: <b>${d.status}</b> · 총액: ${d.price_total}${d.currency || ""}${d.refund_amount ? ` · 환불: ${d.refund_amount}` : ""}</div>
          <div class="meta">예약ID: ${docSnap.id}</div>
        </div>
        <div class="actions">
          ${d.status !== "canceled" ? `<button data-cancel="${docSnap.id}">예약취소</button>` : ""}
        </div>
      </div>
    `;
    box.appendChild(item);
  });

  // 취소 버튼 위임
  box.addEventListener("click", async (e) => {
    const id = e.target?.getAttribute?.("data-cancel");
    if (!id) return;
    await cancelBooking(id);
    await loadMyBookings(containerSelector); // 새로고침
  }, { once: true });
};
</script>
