import Accordion from "../UI/Accordian";
import Header from "../layout/Header";
import data from "../src/data/FAQData.json";

function help() {
  return (
    <div>
      <Header>FAQ's</Header>
      <div style={{padding: 20}}>
        {data.data.map((d) => (
          <Accordion title={d.question} info={d.answer} />
        ))}
      </div>
    </div>
  );
}

export default help;
