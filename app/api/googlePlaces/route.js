export async function GET(request) {

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.NEXT_PUBLIC_GOOGLE_MAP}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return Response.json(data.result);
  } catch (error) {
    return Response.json(
      { error: "Ошибка запроса к Google API" },
      { status: 500 }
    );
}

}
