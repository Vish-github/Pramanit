import React from "react";
import jsPDF from "jspdf";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null,
    };
  }

  generatePDF = () => {
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "This is the first title.");

    doc.addFont("helvetica", "normal");
    doc.text(20, 60, "This is the second title.");
    doc.text(20, 100, "This is the thrid title.");

    // console.log(doc);

    //   doc.save("demo.pdf");
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF} type="primary">
          Download PDF
        </button>
      </div>
    );
  }
}

export default App;
// import React, {useState, useEffect} from "react";
// import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";
// import {PDFViewer} from "@react-pdf/renderer";

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// // Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const App = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return (
//     <div>
//       {isClient && (
//         <PDFViewer>
//           <MyDocument />
//         </PDFViewer>
//       )}
//     </div>
//   );
// };

// export default App;
