import Header from "../layout/Header";
import {Grid} from "@mui/material";
import AboutTeam from "../layout/AboutTeam";

import riddhi from "../assets/PRAMANIT/riddhi.jpeg";
import kedar from "../assets/PRAMANIT/kedar.jpeg";
import shivam from "../assets/PRAMANIT/shivam.jpeg";
import vishwak from "../assets/PRAMANIT/vishwak.jpeg";

function about() {
  return (
    <>
      <Header>About</Header>
      <div style={{paddingLeft: 20, paddingRight: 20}}>
        <h6 style={{fontSize: 20}}>
          This is a final year project made for partial fulfillment of the
          requirements for the degree of Bachelor Of Engineering of Computer
          Engineering Of Goa College Of Engineering Under Goa University for the
          year 2021-22
        </h6>
        <p>
          Birth and death are two ends of the bridge of life. The two events
          need to well documented and preserved to honour lives of indivisuals.
          These documents are used to avail various benefits and are a proof of
          life. In today's selfish world we observe that document is forged and
          exploited to for their gains. Both the Birth and Death certificates
          are an important individual asset. It gets registered in the civil
          record of a concerned government authority within 21 days. There are
          many barriers in the process of birth/death registration, most of them
          do not register their birth. Furthermore, almost two-thirds of annual
          deaths are not registered. The challenging task is to verify the
          Genuinity of the certificate. Currently, there is a manual process to
          verify the authenticity of the certificates which is time-taking and
          lengthy. Though, there are chances of producing fake certificates
          which may be unnoticed by the verifier. Also, missing certificates as
          they are in hard copies. We propose a decentralized system based on
          blockchain technology, which makes certificate sharing possible while
          enabling trust among certificate receivers, corresponding issuing
          authority and end users who will verify the certificate validation by
          adopting smart contracts without any other systems. We are going to
          develop a decentralized certificate verification application on the
          Ethereum Blockchain. By using the blockchain technology we will be
          able to eradicate the problems like fake certificates and
          double-spending. Smart contract is a self executing code which ensures
          authenticated data is added to the blockchain. The encrypted hash
          value of each certificate will be stored in the blockchain using ipfs.
          Verification of the authenticity of academic certificates is done by
          checking the presence of the respective ipfs hash value We also aim to
          take the entire process online where the user can apply online and as
          per traditions the entire power of issuing these certicates rests in
          the hands of the local bodies of Municipality or Panchayat
          respectively
        </p>
        <Grid container>
          <AboutTeam
            name="Riddhi Siddarkar"
            designation="Full Stack Developer"
            image={riddhi}
            twitterlink="https://twitter.com/siddarkar"
            linkedinlink="https://in.linkedin.com/in/riddhi-siddarkar-075378191"
            githublink="www.github.com/riddhisiddarkar"
          />
          <AboutTeam
            name="Kedar Devasthali"
            designation="Back-end Developer"
            image={kedar}
            twitterlink="https://twitter.com/DevsKedar"
            linkedinlink="https://www.linkedin.com/in/kedar-devasthali-0b8b081b5"
            githublink="https://github.com/kedar-devs"
          />
          <AboutTeam
            name="Shivam Naik"
            designation="Front-end Developer"
            image={shivam}
            twitterlink="https://twitter.com/axiom_39"
            linkedinlink="https://www.linkedin.com/in/shivamnaik39"
            githublink="https://github.com/shivamnaik39"
          />
          <AboutTeam
            name="T. S. Vishwak"
            designation="Front-end Developer"
            image={vishwak}
            twitterlink="https://twitter.com/TSVishwak"
            linkedinlink="https://www.linkedin.com/in/t-s-v-747a89128"
            githublink="https://github.com/Vish-github"
          />
        </Grid>
      </div>
    </>
  );
}

export default about;
