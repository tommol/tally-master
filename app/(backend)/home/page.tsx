import {Container, Flex, Image, Paper, Title, Text, Button} from "@mantine/core";
import JudgeIntro from "../../../components/Home/JudgeIntro/JudgeIntro";
import {sendMail} from "../../../email/sender";

export default  async function HomePage() {
    return (<div>

        <JudgeIntro />
    </div>)
}