/**
 * Formata URLs do Google Drive para que possam ser renderizadas diretamente em tags <img>.
 * Converte links de visualização (.../view) para o endpoint de thumbnail/download.
 */
export const formatDriveUrl = (url: string) => {
  if (!url) return '';
  
  // Se já for uma URL formatada de thumbnail, não faz nada
  if (url.includes('drive.google.com/thumbnail')) return url;

  // Verifica se é um link do Google Drive
  if (url.includes('drive.google.com')) {
    // Tenta extrair o ID de diferentes formatos de link
    let id = '';
    
    if (url.includes('/d/')) {
      id = url.split('/d/')[1]?.split('/')[0];
    } else if (url.includes('id=')) {
      id = url.split('id=')[1]?.split('&')[0];
    }

    if (id) {
      // Retorna o endpoint de thumbnail com alta resolução
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }
  }
  
  return url;
};
