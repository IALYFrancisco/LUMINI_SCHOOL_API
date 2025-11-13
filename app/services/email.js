export async function SendClientEmail(request, response){
    try{

        let emailTemplate = `<!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
                <style>
                    .poppins-regular {
                        font-family: "Poppins", sans-serif;
                        font-weight: 400;
                        font-style: normal;
                    }
                </style>
                <title>Document</title>
            </head>
            <body style="width: 100%; display: flex; justify-content: center;">
                <section style="width: 100%; max-width: 700px; margin: 50px auto 50px auto;">
                    <header style="background: #1b2232; width: 100%; height: 50px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-position: center; background-repeat: no-repeat; background-size: cover;">
                    </header>
                    <main style="padding: 0 30px;">
                        <a href="https://luminischool.onrender.com/" target="_blank" style="text-decoration: none;">
                            <header style="padding-top: 30px; display: flex; align-items: center;">
                                <!-- <img style="width: 50px;" src="logo_apipost.png" alt="Logo de LUMINI School"> -->
                                <h2 class="poppins-regular" style=" display: flex; align-items: center; color: #4a78a6;">LUMINI School</h2>
                            </header>
                        </a>
                        <main style=" color: #1b2232;">
                            <h3 class="poppins-regular">Les d├®tails du message sont les suivants :</h3>
                            <ul>
                                <li>
                                    <h4 class="poppins-regular" style="font-size: 14px; font-weight: 600; display: inline; color: #4a78a6;">Nom du client :</h4>
                                    <p class="poppins-regular" style="font-size: 14px; display: inline;">${request.body.name}</p>
                                </li>
                                <li style="margin-top: 20px;">
                                    <h4 class="poppins-regular" style="font-size: 14px; font-weight: 600; display: inline; color: #4a78a6;">Son email :</h4>
                                    <p class="poppins-regular" style="font-size: 14px; display: inline;">${request.body.email}</p>
                                </li>
                                <li style="margin-top: 20px;">
                                    <h4 class="poppins-regular" style="font-size: 14px; font-weight: 600; display: inline; color: #4a78a6;">Num├®ro de son mobile :</h4>
                                    <p class="poppins-regular" style="font-size: 14px; display: inline;">${request.body.telephone}</p>
                                </li>
                                <li style="margin-top: 20px;">
                                    <h4 class="poppins-regular" style="font-size: 14px; font-weight: 600; display: inline; color: #4a78a6;">Objet de son contact :</h4>
                                    <p class="poppins-regular" style="font-size: 14px; display: inline;">${request.body.object}</p>
                                </li>
                                <li style="margin-top: 20px;">
                                    <h4 class="poppins-regular" style="font-size: 14px; font-weight: 600; display: inline; color: #4a78a6;">Son message :</h4>
                                    <p class="poppins-regular" style="font-size: 14px; display: inline;">${request.body.message}</p>
                                </li>
                            </ul>
                        </main>
                    </main>
                    <footer style="background: #1b2232;  width: 100%; height: 50px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; background-position: center; background-repeat: no-repeat; background-size: cover; margin-top: 50px;">
                    </footer>
                </section>
            </body>
            </html>`

        response.status(200).end()
    }catch(err){
        response.status(500).end()
    }
}