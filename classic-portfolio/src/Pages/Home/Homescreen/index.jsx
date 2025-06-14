import AboutMe from "../AboutMe";
import ContactMe from "../ContactMe";
import Footer from "../Footer";
import MainSection from "../MainSection";
import MyExperience from "../MyExperience";
import MyPortfolio from "../MyPortfolio";
import MySkills from "../MySkills";
import Research from "../Research";

export default function Home () {
    return (
        <>
            <MainSection />
            <MySkills />
            <AboutMe />
            <MyPortfolio />
            <MyExperience />
            <Research />
            <ContactMe />
            <Footer />
        </>
    )
}