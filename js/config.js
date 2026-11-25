/* ============================================================
   CONFIGURACIÓN DEL SITIO — edita solo este archivo
   Todo lo marcado como PENDIENTE debe confirmarse con Nat.
   ============================================================ */
window.SITIO = {
  // PENDIENTE: número de WhatsApp con código de país, sin "+", espacios ni guiones.
  // Ejemplo de formato para México: "5215512345678"
  whatsapp: "520000000000",
  whatsappConfirmado: false, // cambia a true cuando el número sea el real

  // Mensaje con el que se abre el chat desde los botones generales
  mensaje: "Hola Nat, me gustaría agendar una consulta de nutrición.",

  // PENDIENTE: dirección exacta del consultorio tal como aparece en Google Maps.
  // Mientras esté vacío, la página muestra un aviso en lugar de un mapa.
  // Puede ser la dirección o coordenadas: "19.4326,-99.1332"
  mapa: "",

  // PENDIENTE: enlaces completos a sus redes. Vacío = se muestra como pendiente.
  redes: {
    instagram: "",
    facebook: "",
    tiktok: ""
  }
};
