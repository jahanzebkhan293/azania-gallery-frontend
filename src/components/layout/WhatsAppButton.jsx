function WhatsAppButton() {
  const phoneNumber = "923414347817";

  const message = encodeURIComponent(
    "Hello AZANIA GALLERY, I have a question about your products."
  );

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-button"
      aria-label="Chat with AZANIA GALLERY on WhatsApp"
    >

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.16 1.59 5.97L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.43-8.45ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.21-3.72.97.99-3.62-.23-.37a9.87 9.87 0 0 1-1.51-5.3C2.18 6.45 6.6 2.04 12.05 2.04c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.45-4.43 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>

      <span className="whatsapp-button-text">
        WhatsApp
      </span>

    </a>
  );
}

export default WhatsAppButton;