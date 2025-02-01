import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../lib/prisma";
import {ApplyFormType} from "../../../../../components/ApplyForm/schema";
import {sendMail} from "../../../../../email/sender";

/// This is the route for reading all contestants
export async function GET(request: NextRequest, {params}: { params: Promise<{ contestId: string }> }) {
    const contestants = await prisma.contestant.findMany({
        where: {
            contestId: parseInt((await params).contestId)
        },
    });
    return new NextResponse(JSON.stringify(contestants), {status: 200})
}

const applyEmail = (firstName: string) => (
    `$Witaj {firstName}, \r\n` + "" +
    "Otrzymaliśmy twoją aplikację w tegorocznej edycji wyborów. Jest nam niezmiernie miło," +
    " że zdecydowałeś się na ten krok. Mamy dla ciebie kilka ważnych informacji: \r\n" +
        " 1. Nasz zespół, przenalizuje czy twoja aplikacja spełnia warunki startu. \r\n" +
    "2. Do momentu ogłoszenia kandydatów, nie możesz informaować publicznie o swoim zgłoszeniu. \r\n" +
    "3. W przypadku większej niż 6 ilości chętnych, przygotujemy eliminacje wstępne.\r\n" +
    "4. O wszystkim związanym z wyborami będziemy cię informować na bieżąco\r\n " +
    "\r\n" +
    "Pozdrawiamy\r\n" +
    "Organizatorzy Warsaw Fetish Weekend"
)
/// This is the route for creating a new contestant
export async function POST(request: NextRequest, {params}: { params: Promise<{ contestId: string }> }) {
    const body: ApplyFormType = await request.json();
    const {contestId} = await params;

    const {id} = await prisma.contestant.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            nickname: body.nickanme,
            birthdate: body.birthday,
            email: body.email,
            city: body.city,
            biography: body.bio,
            motivation: body.motivation,
            performance: body.performance,
            plans: body.plans,
            mainPhoto: body.mainPhoto,
            photo1: body.photo1,
            photo2: body.photo2,
            instagram: body.instagram,
            contestId: Number.parseInt(contestId)
        }
    });
    await sendMail({
        email: 'wfw@plug.org.pl',
        sendTo: body.email,
        subject: 'Aplikacja przyjęta',
        text: applyEmail(body.firstName)
    });
    return new NextResponse(JSON.stringify({id}), {status: 200})
}

