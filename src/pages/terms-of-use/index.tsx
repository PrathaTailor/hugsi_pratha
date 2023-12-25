import React from 'react';
import SEO from '../../hooks/seo';
import { Typography, useMediaQuery, Divider } from '@material-ui/core';
import { useStyles } from '../../styles/terms-of-use';

const browser = typeof window !== 'undefined' && window;

/**
 * Terms of use Page
 */
export default function TermsOfUsePage() {
  const styles = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  if (!browser) {
    return null;
  }

  return (
    <section>
      <SEO title="Terms of use" />
      <main className={styles.root}>
        <section
          className={smallScreen ? styles.smallErrorMessage : styles.message}
        >
          <div style={{}}>
            <section>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: smallScreen ? '1rem' : '11rem',
                  padding: smallScreen ? '8rem 1rem' : '0 3rem',
                }}
              >
                <Typography
                  variant={smallScreen ? 'body2' : 'h6'}
                  style={{
                    fontWeight: 'bold',
                    lineHeight: '1',
                    marginTop: '2rem',
                  }}
                ></Typography>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Terms of use
                </Typography>

                <Typography variant={'h6'}>
                  Husqvarna appreciates your interest in HUGSI. We request and
                  strongly encourage you to carefully read these Terms of use
                  before using the site. By using the site you agree to be bound
                  by the Terms.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  General
                </Typography>

                <Typography variant={'h6'}>
                  This website, and any sub-sites thereof, (together the "Site")
                  is published and maintained by Husqvarna AB (publ)/GARDENA
                  GmbH or its group companies, subsidiaries or branch offices
                  (together HUSQVARNA). Your use of the Site is subject to a
                  legally binding agreement between you and HUSQVARNA (the
                  “Agreement”). The following are the terms of the Agreement
                  (the “Terms”). By using the Site you acknowledge that you have
                  read, understood and agreed to the Terms and all related
                  documents. It is important that you read them carefully. If
                  you do not agree to the Terms and all related documents, you
                  are not allowed to use the Site.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  HUGSI Legal disclaimer
                </Typography>

                <Typography variant={'h6'}>
                  All results are assumptions based on our open methodology and
                  the AI-models used.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  License
                </Typography>

                <Typography variant={'h6'}>
                  Subject to the Terms set forth in this Agreement, HUSQVARNA
                  grants you a non-exclusive, non-transferable, limited right to
                  access, use and display this Site and the materials thereon.
                  You agree not to interrupt or attempt to interrupt the
                  operation of the Site in any way.
                </Typography>
                <Typography variant={'h6'}>
                  HUSQVARNA authorizes you to view and download the information
                  ("Materials") on the Site only for your personal,
                  non-commercial use, unless otherwise expressly stated. This
                  authorization is not a transfer of title in the Materials and
                  copies of the Materials and is subject to the following
                  restrictions:
                  <br></br>
                  {'1)'} you must retain, on all copies of the Materials downloaded,
                  all copyright and other proprietary notices contained in the
                  Materials;
                  <br></br>
                  {'2)'} you may not modify the Materials in any way or reproduce or
                  publicly display, perform, or distribute or otherwise use or
                  communicate them for any public or commercial purpose; and
                  <br></br>
                  {'3)'} you must not transfer the Materials to any other person
                  unless you give them notice of, and they agree to accept, the
                  obligations arising under these Terms. You agree to abide by
                  all additional restrictions displayed on the Site as it may be
                  updated from time to time.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  User warranties
                </Typography>

                <Typography variant={'h6'}>
                  You represent and warrant that you will use the Site in
                  compliance with these Terms including the laws and provisions
                  under this Agreement and to comply with all existing and
                  future Site policies and rules. You agree that you will not
                  use the Site to:
                  <br></br>
                  (a) transmit spam or unsolicited communications;
                  <br></br>
                  (b) pretend to be HUSQVARNA or someone else or allow a third
                  party to pretend to be you;
                  <br></br>
                  (c) forge headers or otherwise manipulate identifiers in order
                  to disguise the origin of any content transmitted through the
                  Site;
                  <br></br>
                  (d) misrepresent your affiliation with a person or entity;
                  <br></br>
                  (e) act in a manner that negatively affects other users'
                  ability to use the Site;
                  <br></br>
                  (f) engage in activities that would violate any applicable
                  law,
                  <br></br>
                  (g) post or transmit any material which violates or infringes
                  in any way upon the rights of others or which is unlawful,
                  abusive, defamatory, vulgar or otherwise objectionable or
                  which contains any advertising or solicitation with respect to
                  products or services order
                  <br></br>
                  (h) collect or store personal data about other users unless
                  specifically authorized by such users.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Privacy
                </Typography>

                <Typography variant={'h6'}>
                  Information about HUSQVARNA’s privacy practices, how we
                  collect and handle your personal data and how we protect your
                  privacy can be found in
                  <a
                    href="https://privacyportal.husqvarnagroup.com/uk/privacy-notice/"
                    target="_blank"
                    style={{ color: 'white' }}
                  >
                    HUSQVARNA’s Privacy Policy.
                  </a>{' '}
                  By using this Site you agree to your personal data being used
                  in accordance with HUSQVARNA’s Privacy Policy.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Changes
                </Typography>

                <Typography variant={'h6'}>
                  HUSQVARNA reserves the right, at its sole discretion, to
                  change, modify, add or remove any portion of this Agreement in
                  whole or in part, at any time and without giving prior notice.
                  Changes in this Agreement will be effective when posted on the
                  Site. Your continued use of the Site after any change to this
                  Agreement is posted will be considered acceptance of those
                  changes.
                </Typography>
                <br></br>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Intellectual Property rights
                </Typography>

                <Typography variant={'h6'}>
                  You acknowledge and agree that all intellectual property
                  rights (including, but not limited to, copyright, patents,
                  know-how, confidential information, database rights, and
                  rights in trademarks and designs whether registered or
                  unregistered) in the Site are vested in HUSQVARNA or its
                  licensors. All goodwill and intellectual property rights
                  arising through the use of such intellectual property rights
                  vested in HUSQVARNA shall inure to HUSQVARNA.
                </Typography>
                <br></br>
                <Typography variant={'h6'}>
                  This Site, including all Materials, is copyrighted and
                  protected by worldwide copyright laws and treaty provisions.
                  You agree to comply with all copyright laws worldwide in your
                  use of this Site, including all Material, and to prevent any
                  unauthorized copying of the Materials. HUSQVARNA does not
                  grant any express or implied right to you under any patents,
                  designs, trademarks, copyrights or trade secret legislation.
                </Typography>
                <br></br>
                <Typography variant={'h6'}>
                  You acknowledge and agree that you will not, and nothing in
                  these Terms gives you the right to, use HUSQVARNA trademarks,
                  trade names, service marks, logos, domain names or other
                  distinctive brand features other than as expressly stated in
                  the HUSQVARNA’s Trade Mark List.
                </Typography>
                <br></br>
                <Typography variant={'h6'}>
                  Please note that any information, unsolicited suggestions,
                  ideas or other submissions will be deemed not to be
                  confidential and to be non-proprietary. By sending any
                  information or material, except in a Patent Information
                  Declaration as described in the Husqvarna Policy Regarding
                  Consideration of Unsolicited Ideas, you grant HUSQVARNA an
                  unrestricted, royalty-free, irrevocable and world-wide license
                  to use, reproduce, display, perform, modify, transmit and
                  distribute those materials or information, and you also agree
                  that HUSQVARNA is free to use any ideas, concepts, know-how or
                  techniques that you send us for any purpose. For more
                  information, please see the Husqvarna Policy Regarding
                  Consideration of Unsolicited Ideas.
                </Typography>

                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Other websites
                </Typography>

                <Typography variant={'h6'}>
                  For your convenience, the Site may include links to sites on
                  the Internet that are owned, published and maintained by third
                  parties. HUSQVARNA does not undertake to monitor or review
                  such Third Party Site Content nor is HUSQVARNA responsible for
                  the accuracy or reliability of any such third party web sites.
                </Typography>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Exclusion of implied warranties
                </Typography>

                <Typography variant={'h6'}>
                  Although care has been taken to ensure the accuracy of the
                  information on and the continued availability of this Site,
                  HUSQVARNA assumes no responsibility therefore. THE MATERIALS
                  MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL ERRORS. HUSQVARNA
                  DOES NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE MATERIALS
                  OR THE RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER
                  INFORMATION DISPLAYED OR DISTRIBUTED THROUGH THE SITE. YOU
                  ACKNOWLEDGE THAT ANY RELIANCE ON ANY SUCH OPINION, ADVICE,
                  STATEMENT, MEMORANDUM, OR INFORMATION SHALL BE AT YOUR SOLE
                  RISK. ALL CONTENT IS PROVIDED "AS IS" AND "AS AVAILABLE".
                  HUSQVARNA EXPRESSLY DISCLAIMS ANY REPRESENTATIONS OR
                  WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT
                  LIMITATION WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A
                  PARTICULAR PURPOSE, NON-INFRINGEMENT, OR AS TO THE OPERATION
                  OF THIS SITE OR THE CONTENT. HUSQVARNA DOES NOT WARRANT OR
                  MAKE ANY REPRESENTATIONS AS TO THE SECURITY OF THIS WEBSITE.
                  YOU ACKNOWLEDGE ANY INFORMATION SENT MAY BE INTERCEPTED.
                  HUSQVARNA DOES NOT WARRANT THAT THE WEBSITE OR THE SERVERS
                  WHICH MAKE THIS SITE AVAILABLE OR ELECTRONIC COMMUNICATIONS
                  SENT BY HUSQVARNA ARE FREE FROM VIRUSES OR ANY OTHER HARMFUL
                  ELEMENTS. ALL SUCH REPRESENTATIONS, WARRANTIES AND CONDITIONS
                  ARE EXCLUDED EXCEPT TO THE EXTENT THAT LAW PROHIBITS THEIR
                  EXCLUSION. THIS EXCLUSION OF IMPLIED WARRANTIES SHALL ALSO
                  APPLY IN REGARDS TO ANY THIRD PARTY SITE.
                </Typography>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Limitation of liability
                </Typography>

                <Typography variant={'h6'}>
                  IN NO EVENT SHALL HUSQVARNA BE LIABLE FOR ANY DIRECT,
                  INDIRECT, CONSEQUENTIAL, PUNITIVE, SPECIAL OR INCIDENTAL
                  DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF
                  BUSINESS, CONTRACT, REVENUE, DATA, INFORMATION OR BUSINESS
                  INTERRUPTION) RESULTING FROM, ARISING OUT OF OR IN CONNECTION
                  WITH THE USE OF, OR INABILITY TO USE THIS SITE OR THE CONTENT
                  OR OUT OF OR IN CONNECTION WITH THESE TERMS, EVEN IF HUSQVARNA
                  HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN
                  ADDITION TO THE TERMS SET FORTH HEREIN, IN NO EVENT SHALL
                  HUSQVARNA BE LIABLE FOR ANY ERRORS, INACCURACIES, OMISSIONS OR
                  OTHER DEFECTS OR UNTIMELINESS OR UNAUTHENTICITY OF ANY
                  INFORMATION CONTAINED IN THIS SITE. THIS LIMITATION OF
                  LIABILITY SHALL ALSO APPLY IN REGARDS TO ANY THIRD PARTY SITE.
                </Typography>
                <br></br>
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  Jurisdiction Statement
                </Typography>

                <Typography variant={'h6'}>
                  This Site is controlled, operated and administered by
                  HUSQVARNA from its offices in Sweden. HUSQVARNA makes no
                  representation that materials at this Site are appropriate or
                  available for use at other locations outside of Sweden.
                  Accessing the Site from territories where their contents of
                  the Site are illegal is prohibited. If you access this Site
                  from locations outside of Sweden, you are responsible for
                  compliance with all local laws. The laws of the Kingdom of
                  Sweden shall govern this Agreement, without giving effect to
                  its conflict of laws provisions. The Stockholm District Court
                  shall have exclusive jurisdiction in the first instance on any
                  dispute arising from this Agreement.
                </Typography>
                <br></br>
                <Typography variant={'h6'}>
                  This has been updated last 06.11.20.
                </Typography>
              </div>

              <br />
              <section
                style={{
                  margin: smallScreen ? '1rem' : '2rem 3rem 0rem',
                  fontWeight: 'bold',
                }}
              ></section>
            </section>
          </div>
          <div
            style={{
              display: 'flex',
              placeContent: 'center',
              placeItems: 'center',
            }}
          ></div>
        </section>
      </main>
      <Divider />
    </section>
  );
}