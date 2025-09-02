// 10개국어 결제 텍스트
window.I18N = Object.assign({}, window.I18N || {}, {
  en: { payment: {
    title: "Choose your payment method",
    subtitle: "Your booking will be auto-confirmed after successful payment.",
    crypto: "Pay with Cryptocurrency (NOWPayments)",
    success: "Payment successful. Your booking is confirmed.",
    failed: "Payment failed or canceled.",
    payNow: "Pay Now", btc: "Bitcoin (BTC)", eth: "Ethereum (ETH)", usdt: "Tether (USDT)"
  }},
  ko: { payment: {
    title: "결제 방법을 선택하세요",
    subtitle: "결제 완료 시 예약이 자동 확정됩니다.",
    crypto: "암호화폐로 결제하기 (NOWPayments)",
    success: "결제가 완료되었습니다. 예약이 확정되었습니다.",
    failed: "결제가 실패했거나 취소되었습니다.",
    payNow: "지금 결제", btc: "비트코인 (BTC)", eth: "이더리움 (ETH)", usdt: "테더 (USDT)"
  }},
  fr: { payment: {
    title: "Choisissez votre mode de paiement",
    subtitle: "Votre réservation sera automatiquement confirmée après paiement réussi.",
    crypto: "Payer avec crypto-monnaie (NOWPayments)",
    success: "Paiement réussi. Votre réservation est confirmée.",
    failed: "Le paiement a échoué ou a été annulé.",
    payNow: "Payer maintenant", btc: "Bitcoin (BTC)", eth: "Ethereum (ETH)", usdt: "Tether (USDT)"
  }},
  tr: { payment: {
    title: "Ödeme yöntemini seçin",
    subtitle: "Ödeme başarılı olduğunda rezervasyon otomatik onaylanır.",
    crypto: "Kripto ile öde (NOWPayments)",
    success: "Ödeme başarılı. Rezervasyonunuz onaylandı.",
    failed: "Ödeme başarısız veya iptal edildi.",
    payNow: "Şimdi öde", btc: "Bitcoin (BTC)", eth: "Ethereum (ETH)", usdt: "Tether (USDT)"
  }},
  ja: { payment: {
    title: "お支払い方法を選択してください",
    subtitle: "支払い完了後、予約は自動的に確定されます。",
    crypto: "暗号通貨で支払う（NOWPayments）",
    success: "支払いが完了しました。予約が確定しました。",
    failed: "支払いが失敗またはキャンセルされました。",
    payNow: "今すぐ支払う", btc: "ビットコイン (BTC)", eth: "イーサリアム (ETH)", usdt: "テザー (USDT)"
  }},
  de: { payment: {
    title: "Zahlungsmethode wählen",
    subtitle: "Nach erfolgreicher Zahlung wird Ihre Buchung automatisch bestätigt.",
    crypto: "Mit Kryptowährung bezahlen (NOWPayments)",
    success: "Zahlung erfolgreich. Ihre Buchung ist bestätigt.",
    failed: "Zahlung fehlgeschlagen oder abgebrochen.",
    payNow: "Jetzt bezahlen", btc: "Bitcoin (BTC)", eth: "Ethereum (ETH)", usdt: "Tether (USDT)"
  }},
  es: { payment: {
    title: "Elige tu método de pago",
    subtitle: "Tu reserva se confirmará automáticamente tras el pago exitoso.",
    crypto: "Pagar con criptomoneda (NOWPayments)",
    success: "Pago realizado con éxito. Tu reserva está confirmada.",
    failed: "El pago falló o fue cancelado.",
    payNow: "Pagar ahora", btc: "Bitcoin (BTC)", eth: "Ethereum (ETH)", usdt: "Tether (USDT)"
  }},
  ru: { payment: {
    title: "Выберите способ оплаты",
    subtitle: "После успешной оплаты бронирование будет автоматически подтверждено.",
    crypto: "Оплатить криптовалютой (NOWPayments)",
    success: "Оплата прошла успешно. Ваше бронирование подтверждено.",
    failed: "Оплата не удалась или была отменена.",
    payNow: "Оплатить", btc: "Биткойн (BTC)", eth: "Эфириум (ETH)", usdt: "Тезер (USDT)"
  }},
  it: { payment: {
    title: "Scegli il metodo di pagamento",
    subtitle: "La prenotazione sarà confermata automaticamente dopo il pagamento riuscito.",
    crypto: "Paga con criptovaluta (NOWPayments)",
    success: "Pagamento riuscito. La tua prenotazione è confermata.",
    failed: "Pagamento non riuscito o annullato.",
    payNow: "Paga ora", btc: "Bitcoin (BTC)", eth: "Ethereum (ETH)", usdt: "Tether (USDT)"
  }},
  zh: { payment: {
    title: "选择支付方式",
    subtitle: "付款成功后，您的预订将自动确认。",
    crypto: "使用加密货币支付（NOWPayments）",
    success: "付款成功。您的预订已确认。",
    failed: "付款失败或已取消。",
    payNow: "立即支付", btc: "比特币 (BTC)", eth: "以太坊 (ETH)", usdt: "泰达币 (USDT)"
  }},
});

// 기본 언어 세팅 (필요 시 상단 네비의 언어 드롭다운과 연동)
window.CUR_LANG = window.CUR_LANG || (document.documentElement.lang || "en");
