/**
 * Formata URLs do Google Drive para que possam ser renderizadas diretamente em tags <img>.
 * Converte links de visualização (.../view) para o endpoint de thumbnail/download.
 */
export const formatDriveUrl = (url: string) => {
  if (!url) return '';
  
  // Verifica se é um link do Google Drive
  if (url.includes('drive.google.com')) {
    // Extrai o ID do arquivo do link
    const id = url.split('/d/')[1]?.split('/')[0];
    if (id) {
      // Retorna o endpoint de thumbnail que funciona em tags <img>
      // sz=w1000 garante uma boa resolução
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }
  }
  
  return url;
};
