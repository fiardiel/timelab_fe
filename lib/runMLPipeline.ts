"use server";

export const runMLPipeline = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/facetrack/fetch-base-images/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  })

  const data = await res.json()
  return data
};
