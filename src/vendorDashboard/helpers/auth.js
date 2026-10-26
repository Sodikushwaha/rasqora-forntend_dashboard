export const getVendorIdFromToken = (token) => {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(
      window.atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))
    );

    return decodedPayload.vendorId || decodedPayload.sub || null;
  } catch {
    return null;
  }
};
