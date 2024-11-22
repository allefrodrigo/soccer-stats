import axios from "axios";

export async function fetchGames() {
  try {
    const response = await axios.get(
      "https://footstatsapiapp.azurewebsites.net/partidas/hoje",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );

    // Retornar apenas o array de dados da API
    return response.data?.data || [];
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return [];
  }
}
