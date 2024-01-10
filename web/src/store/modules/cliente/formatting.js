export const formatCep = (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;
}