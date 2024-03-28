import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1, // Add border bottom
    borderBottomColor: 'black', // Choose color
    justifyContent: 'space-between',
  },
  image: {
    width: '40%',
    marginRight: 20,
  },
  fromCont: {
    flexDirection: 'row',
    fontSize: '10px',
    width: '100%',
    minHeight: 60,
  },
  fromView: {
    backgroundColor: '#F7F6C6',
    paddingTop: '5px',
    paddingLeft: '5px',
    paddingRight: '20px',
  },
  fromDetails: {
    backgroundColor: '#F3F3EF',
    padding: '5px',
    fontWeight: 'bold',
    width: '100%',
  },
  toCont: {
    flexDirection: 'row',
    fontSize: '10px',
    width: '100%',
    marginTop: '10px',
    minHeight: 60,
  },
  toView: {
    backgroundColor: '#F7F6C6',
    paddingTop: '5px',
    paddingLeft: '5px',
    paddingRight: '32px',
  },
  toDetails: {
    backgroundColor: '#F3F3EF',
    padding: '5px',
    fontWeight: 'bold',
    width: '100%',
  },

  invStatus: {
    padding: '5px',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#F7F6C6',
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: '#F3F3EF',
    fontSize: 10,
    borderRight: 1,
    borderRightColor: '#EFEDED',
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: '#F3F3EF',
  },
});

const InvoiceTemplate = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.imageView}>
              <Image style={styles.image} src="/images/BLACK.png" />
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 20,
                  paddingRight: '10px',
                }}
              >
                INVOICE
              </Text>
            </View>

            {/* From, To, Invoice Date, Due Date, Status */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={{ width: '350px', height: '120px' }}>
                <View style={styles.fromCont}>
                  <Text style={styles.fromView}>From : </Text>
                  <View style={styles.fromDetails}>
                    <Text
                      style={{
                        paddingBottom: '5px',
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      Shot The Box (MA0309203-K)
                    </Text>
                    <Text>No. 46, Jalan KP 3, Taman Krubong Perdana</Text>
                    <Text>75260 Melaka Melaka</Text>
                    <Text style={{ paddingTop: '5px' }}>
                      afiqsam71@gmail.com   |   +60136328253
                    </Text>
                  </View>
                </View>
                <View style={styles.toCont}>
                  <Text style={styles.toView}>To : </Text>
                  <View style={styles.toDetails}>
                    <Text
                      style={{
                        paddingBottom: '5px',
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      AIDA PROPERTY GROUP
                    </Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={{ paddingTop: '5px' }}>
                      zaidahabdullah@gmail.com   |   01116185917
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '200px', minheight: '120px' }}>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#F7F6C6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                    #INV000001
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    fontSize: '10px',
                    width: '100%',
                  }}
                >
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 2 }}>
                      <Text
                        style={{
                          ...styles.invStatus,
                          backgroundColor: 'white',
                        }}
                      >
                        Invoice Date :{' '}
                      </Text>
                      <Text
                        style={{
                          ...styles.invStatus,
                          backgroundColor: 'white',
                        }}
                      >
                        Due Date :{' '}
                      </Text>
                      <Text
                        style={{
                          ...styles.invStatus,
                          height: '48px',
                          backgroundColor: 'white',
                          paddingTop: '15px',
                        }}
                      >
                        Status :{' '}
                      </Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text
                        style={{
                          ...styles.invStatus,
                          fontFamily: 'Helvetica-Bold',
                        }}
                      >
                        29-01-2024
                      </Text>
                      <Text
                        style={{
                          ...styles.invStatus,
                          fontFamily: 'Helvetica-Bold',
                        }}
                      >
                        02-02-2024
                      </Text>
                      <Text
                        style={{
                          ...styles.invStatus,
                          height: '48px',
                          fontFamily: 'Helvetica-Bold',
                          fontSize: '15px',
                          paddingTop: '15px',
                        }}
                      >
                        Completed
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Details, Bank etc */}

            <View>
              {/* Details Products */}
              <View>
                <Text
                  style={{
                    paddingTop: '20px',
                    fontSize: 12,
                    fontFamily: 'Helvetica-Bold',
                  }}
                >
                  AIDA PROPERTY GROUP DINNER EVENT 1ST FEB 2024
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderColor: 'black',
                    borderBottom: 'none',
                    marginTop: '20px',
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCell,

                      backgroundColor: '#F7F6C6',
                    }}
                  >
                    <Text>#</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 6,
                      backgroundColor: '#F7F6C6',
                    }}
                  >
                    <Text>Description</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 2,
                      backgroundColor: '#F7F6C6',
                    }}
                  >
                    <Text>Price/Unit</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 2,
                      backgroundColor: '#F7F6C6',
                    }}
                  >
                    <Text>Qtty/Unit</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 2,
                      backgroundColor: '#F7F6C6',
                    }}
                  >
                    <Text>Total (MYR)</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      ...styles.tableCell,
                    }}
                  >
                    <Text>1</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 6,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text>1. 1 Official Photographer with edited photos</Text>
                    <Text>
                      2. 1 Official Videographer with 3-4 minutes footage edited
                      video.
                    </Text>
                    <Text>
                      3. Complimentary Editing using Adobe After Effects
                    </Text>
                    <Text>4. Transportation</Text>
                    <Text>5. Utility</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 2,
                    }}
                  >
                    <Text>10</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 2,
                    }}
                  >
                    <Text>2</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCell,
                      flex: 2,
                      paddingTop: '10px',
                      paddingBottom: '10px',
                    }}
                  >
                    <Text>20</Text>
                  </View>
                </View>
              </View>

              {/* Remarks, subtotal and so on... */}
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    fontSize: '10px',
                    width: '70%',
                    marginTop: '15px',
                    paddingLeft: '10px',
                  }}
                >
                  <Text
                    style={{
                      marginBottom: '8px',
                      fontFamily: 'Helvetica-Bold',
                    }}
                  >
                    Remark/Notes:
                  </Text>
                  <Text>
                    1. A deposit of RM600 must be made before the event. The
                    remaining payment will be made after the ceremony.
                  </Text>
                  <Text>
                    2. Client will get media items 2 days after full payment was
                    made.
                  </Text>
                  <Text>3. Only edited pictures and video will be given.</Text>
                  <Text style={{ marginTop: '20px', color: '#D1D1D1' }}>
                    This is a computer-generated invoice, no signature is
                    required.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: '70px' }}>
                  <View style={{ width: '300px' }}>
                    <View
                      style={{
                        ...styles.tableCell,
                        backgroundColor: 'white',
                        paddingBottom: '20px',
                      }}
                    >
                      <Text>Subtotal (MYR) : </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        backgroundColor: 'white',
                        paddingBottom: '20px',
                      }}
                    >
                      <Text>Tax (MYR) : </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        backgroundColor: 'white',
                        paddingBottom: '20px',
                      }}
                    >
                      <Text>Shipping (MYR) : </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        backgroundColor: 'white',
                        paddingBottom: '20px',
                      }}
                    >
                      <Text>TOTAL PAID (MYR) : </Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        backgroundColor: 'white',
                        paddingBottom: '20px',
                      }}
                    >
                      <Text>Balance Due (MYR) : </Text>
                    </View>
                  </View>
                  <View style={{ width: '150px' }}>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>120.00</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>0.00</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>0.00</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>1200.00</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>120000.00</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={{ marginTop: '20px' }}>
                <Text
                  style={{
                    fontSize: '15px',
                    backgroundColor: '#F7F6C6',
                    padding: '10px',
                  }}
                >
                  Bank Account(s) Detail for Manual Payment
                </Text>
                <View
                  style={{
                    fontSize: '10px',
                    marginBottom: '20px',
                    flexDirection: 'row',
                    padding: '10px',
                    backgroundColor: '#F3F3EF',
                  }}
                >
                  <Image
                    src={'/images/maybanklogo.png'}
                    style={{ width: '40px', marginRight: '20px' }}
                  />
                  <View
                    style={{
                      flexDirection: 'col',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ marginBottom: '5px' }}>Maybank</Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Helvetica-Bold',
                          marginRight: '5px',
                        }}
                      >
                        554044533040
                      </Text>
                      <Text> (AFIQ SAM GLOBAL)</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoiceTemplate;
