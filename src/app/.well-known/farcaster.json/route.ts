export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
    header: "",
    payload: "",
    signature: "",
    },
    frame: {
      version: "1",
      name: "STACK GAME",
      iconUrl: `${appUrl}/icon.jpg`,
      buttonTitle: 'Play Stacks Game!',
      splashImageUrl: `${appUrl}/splash.jpg`,
      splashBackgroundColor: "#000000",
      homeUrl: appUrl,
      webhookUrl: ''
    },
  };

  return Response.json(config);
}