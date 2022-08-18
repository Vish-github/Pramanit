import Accordion from "../UI/Accordian";
import Image from "next/image";
import techstack from "../assets/PRAMANIT/techstack.png";
import Header from "../layout/Header";
import techstackdata from "../src/data/TechStackData.json";

function tech() {
  return (
    <>
      <Header>Tech</Header>
      <div>
        <div style={{width: "50%", margin: "auto"}}>
          <Image src={techstack} />
        </div>
        <div style={{padding: 20}}>
          {techstackdata.data.map((d) => (
            <Accordion title={d.name} info={d.info} />
          ))}
        </div>
      </div>
    </>
  );
}

export default tech;
