import React, { useContext, useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
} from '@react-pdf/renderer';
import { Store } from '../../../../Store';

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
  const { state } = useContext(Store);

  const {
    invoiceUpdate,
    companyInformation,
    logoInformation,
    bankInformation,
  } = state;
  const [appearImage, setAppearImage] = useState('/images/yourlogo.png');

  useEffect(() => {
    if (invoiceUpdate) {
      console.log(invoiceUpdate);
    }
    if (logoInformation) {
      setAppearImage(logoInformation.image);
    }
  }, [invoiceUpdate, logoInformation]);

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.imageView}>
              <Image style={styles.image} src={appearImage} />
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
                      {companyInformation.companyName} (
                      {companyInformation.ssmNumber})
                    </Text>
                    <Text>{companyInformation.address1},</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>
                        {companyInformation ? companyInformation.address2 : ''}
                      </Text>
                      <Text>{companyInformation.postcode},</Text>
                      <Text>{companyInformation.city}, </Text>
                      <Text>{companyInformation.stateName}</Text>
                    </View>
                    <Text style={{ paddingTop: '5px' }}>
                      {companyInformation.email}   |  {' '}
                      {companyInformation.phoneNumber}
                    </Text>
                  </View>
                </View>
                {invoiceUpdate &&
                  invoiceUpdate.selectedClientData &&
                  invoiceUpdate.selectedClientData.length > 0 && (
                    <View style={styles.toCont}>
                      <Text style={styles.toView}>To : </Text>
                      <View style={styles.toDetails}>
                        <Text
                          style={{
                            paddingBottom: '5px',
                            fontFamily: 'Helvetica-Bold',
                          }}
                        >
                          {invoiceUpdate.selectedClientData[0].clientName}
                        </Text>
                        <Text>
                          {invoiceUpdate.selectedClientData[0].address1},
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text>
                            {invoiceUpdate
                              ? invoiceUpdate.selectedClientData[0].address2
                              : ''}
                          </Text>
                          <Text>
                            {invoiceUpdate.selectedClientData[0].postcode},
                          </Text>
                          <Text>
                            {invoiceUpdate.selectedClientData[0].city},{' '}
                          </Text>
                          <Text>
                            {invoiceUpdate.selectedClientData[0].state}
                          </Text>
                        </View>

                        <Text style={{ paddingTop: '5px' }}>
                          {invoiceUpdate.selectedClientData[0].email}  |  {' '}
                          {invoiceUpdate.selectedClientData[0].phoneNumber}
                        </Text>
                      </View>
                    </View>
                  )}
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
                    #INV000002
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
                        {invoiceUpdate.invoiceDate}
                      </Text>
                      <Text
                        style={{
                          ...styles.invStatus,
                          fontFamily: 'Helvetica-Bold',
                        }}
                      >
                        {invoiceUpdate.payBeforeDate}
                      </Text>
                      <Text
                        style={{
                          ...styles.invStatus,
                          height: '48px',
                          fontFamily: 'Helvetica-Bold',
                          fontSize: '9px',
                          paddingTop: '15px',
                          textAlign: 'left',
                          color: '#7B3F00',
                        }}
                      >
                        {invoiceUpdate.selectedStatus}
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
                  {invoiceUpdate.title}
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
                {invoiceUpdate &&
                  invoiceUpdate.selectedClientData &&
                  invoiceUpdate.selectedClientData.length > 0 &&
                  invoiceUpdate.rows.map((service, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <View
                        style={{
                          ...styles.tableCell,
                        }}
                      >
                        <Text> {index + 1} </Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCell,
                          flex: 6,
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text>{service.descriptions}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCell,
                          flex: 2,
                        }}
                      >
                        <Text>{service.unitPrice}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCell,
                          flex: 2,
                        }}
                      >
                        <Text>{service.quantity}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.tableCell,
                          flex: 2,
                          paddingTop: '10px',
                          paddingBottom: '10px',
                        }}
                      >
                        <Text>{service.totalPrice}</Text>
                      </View>
                    </View>
                  ))}
              </View>

              {/* Remarks, subtotal and so on... */}

              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    fontSize: '10px',
                    width: '70%',
                    marginTop: '15px',
                    paddingLeft: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%', // Ensure the container takes full height
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
                  <Text style={{ flex: 1 }}>{invoiceUpdate.note}</Text>{' '}
                  {/* Set flex: 1 to take remaining space */}
                  <Text style={{ color: '#D3D3D3' }}>
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
                      <Text>{invoiceUpdate.subTotal}</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>{invoiceUpdate.taxPrice}</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>{invoiceUpdate.shipping}</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text>{invoiceUpdate.finalPrice}</Text>
                    </View>
                    <View
                      style={{
                        ...styles.tableCell,
                        fontFamily: 'Helvetica-Bold',
                      }}
                    >
                      <Text></Text>
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

                    flexDirection: 'row',
                    padding: '10px',
                    backgroundColor: '#F3F3EF',
                  }}
                >
                  <Image
                    src={bankInformation.selectedBank.imgSrc}
                    style={{ width: '40px', marginRight: '20px' }}
                  />
                  {bankInformation ? (
                    <View
                      style={{
                        flexDirection: 'col',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ marginBottom: '5px' }}>
                        {bankInformation.selectedBank.name}
                      </Text>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text
                          style={{
                            fontFamily: 'Helvetica-Bold',
                            marginRight: '5px',
                          }}
                        >
                          {bankInformation.accountHolder}
                        </Text>
                        <Text>({bankInformation.nameHolder})</Text>
                      </View>
                    </View>
                  ) : (
                    ''
                  )}
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
