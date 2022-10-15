import Head from "next/head";
import Link from "next/link";
import Footer from "../Components/Layouts/Footer";
import Navbar from "../Components/Layouts/Navbar";
import {
  SyncOutlined,
  SearchOutlined,
  WechatOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "#0b0c10" }}>
      <Head>
        <title>ViewingParty - About</title>
        <meta
          name="description"
          content="The best way to watch shows and movies with others"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"flex"} style={{ backgroundColor: "#0b0c10" }}>
        <Navbar />
        <div
          style={{ paddingTop: "150px" }}
          className={"container py-24 mx-auto text-gray-100 flex flex-col"}
        >
          <h1
            className={
              "uppercase py-4 text-4xl md:text-5xl font-normal text-center"
            }
          >
            Privacy policy
          </h1>
          <div className={"flex"}>
            <p className="text-center">
              Thank you for choosing to be part of our community at Viewing
              party LLc
              <p className="mt-5">
                We are commited to protetcing your personal information and your
                right to privacy. If you have any questions or concerns abput
                this privacy notice or our practices with regards to your
                personal information, please contact us at
                admin@viewingparty.net .
                <p className="mt-3 mb-5">
                  When you visit our website{" "}
                  <a style={{ color: "blue" }} href="https://viewingparty.net">
                    Viewing party
                  </a>
                  , and more generally, use any of our services (the "Services",
                  which include the Website), we appreciate that you are
                  trusting us with your personal information. We take your
                  privacy very seriously. In this privacy notice, we seek to
                  explain to you in the clearest way possible what information
                  we collect, how we use it and what rights you have in relation
                  to it. We hope you take some time to read through it
                  carefully, as it is important. If there are any terms in this
                  privacy notice that you do not agree with, please discontinue
                  use of our Services immediately. This privacy notice applies
                  to all information collected through our Services (which, as
                  described above, includes our Website), as well as, any
                  related services, sales, marketing or events. Please read this
                  privacy notice carefully as it will help you understand what
                  we do with the information that we collect.
                </p>
              </p>
            </p>
          </div>
          <div className="flex  flex-col container mx-auto">
            <p className="font-bold mb-3">TABLE OF CONTENTS</p>
            <ol style={{ color: "white" }} className="list-decimal">
              <li style={{ color: "white", listStyle: "inside" }}>
                {" "}
                <Link href="#first-section">
                  WHAT INFORMATION DO WE COLLECT?
                </Link>
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                {" "}
                <Link href="#secound-section">
                  HOW DO WE USE YOUR INFORMATION?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#third-section">
                  WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#fourth-section">
                  HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#fifth-section">
                  IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#sixth-section">
                  HOW LONG DO WE KEEP YOUR INFORMATION?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                {" "}
                <Link href="#seventh-section">
                  HOW DO WE KEEP YOUR INFORMATION SAFE?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#eight-section">
                  WHAT ARE YOUR PRIVACY RIGHTS?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#nineth-section">
                  CONTROLS FOR DO-NOT-TRACK FEATURES
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#tenth-section">
                  DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#eleventh-section">
                  DO WE MAKE UPDATES TO THIS NOTICE?
                </Link>{" "}
              </li>
              <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#twelveth-section">
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </Link>{" "}
              </li>
              {/* <li style={{ color: "white", listStyle: "inside" }}>
                <Link href="#thirteenth-section">
                  HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM
                  YOU?
                </Link>
              </li> */}
            </ol>
          </div>
          <div className="mt-10" id="first-section">
            <p className="text-center font-bold">
              1. WHAT INFORMATION DO WE COLLECT?
            </p>
            <i>
              In Short:  Some information — such as your Internet Protocol (IP)
              address and/or browser and device characteristics — is collected
              automatically when you visit our Website.
            </i>
            <p className="mt-3">
              We automatically collect certain information when you visit, use
              or navigate the Website. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Website and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Website, and for our
              internal analytics and reporting purposes.
            </p>
            <p className="mt-3">The information we collect includes:</p>
            <p className="ml-5 mt-3">
              <ul>
                <li style={{ color: "white", listStyle: "inside" }}>
                  Log and Usage Data. Log and usage data is service-related,
                  diagnostic, usage and performance information our servers
                  automatically collect when you access or use our Website and
                  which we record in log files. Depending on how you interact
                  with us, this log data may include your IP address, device
                  information, browser type and settings and information about
                  your activity in the Website (such as the date/time stamps
                  associated with your usage, pages and files viewed, searches
                  and other actions you take such as which features you use),
                  device event information (such as system activity, error
                  reports (sometimes called 'crash dumps') and hardware
                  settings).
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  Device Data. We collect device data such as information about
                  your computer, phone, tablet or other device you use to access
                  the Website. Depending on the device used, this device data
                  may include information such as your IP address (or proxy
                  server), device and application identification numbers,
                  location, browser type, hardware model Internet service
                  provider and/or mobile carrier, operating system and system
                  configuration information.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  Location Data. We collect location data such as information
                  about your device's location, which can be either precise or
                  imprecise. How much information we collect depends on the type
                  and settings of the device you use to access the Website. For
                  example, we may use GPS and other technologies to collect
                  geolocation data that tells us your current location (based on
                  your IP address). You can opt out of allowing us to collect
                  this information either by refusing access to the information
                  or by disabling your Location setting on your device. Note
                  however, if you choose to opt out, you may not be able to use
                  certain aspects of the Services.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-3" id="secound-section">
            <p className="text-center font-bold">
              2. HOW DO WE USE YOUR INFORMATION?
            </p>
            <i>
              In Short:  We only share information with your consent, to comply
              with laws, to provide you with services, to protect your rights,
              or to fulfill business obligations.
            </i>
            <p className="mt-3">
              We may process or share your data that we hold based on the
              following legal basis:
            </p>
            <p className="ml-5 mt-3">
              <ul>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">
                    To facilitate account creation and logon process.
                  </span>{" "}
                  If you choose to link your account with us to a third-party
                  account (such as your Google or Facebook account), we use the
                  information you allowed us to collect from those third parties
                  to facilitate account creation and logon process for the
                  performance of the contract. See the section below headed "HOW
                  DO WE HANDLE YOUR SOCIAL LOGINS?" for further information.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">To post testimonials.</span> We
                  post testimonials on our Website that may contain personal
                  information. Prior to posting a testimonial, we will obtain
                  your consent to use your name and the content of the
                  testimonial. If you wish to update, or delete your
                  testimonial, please contact us at admin@viewingparty.net and
                  be sure to include your name, testimonial location, and
                  contact information.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">Request feedback.</span> We may
                  use your information to request feedback and to contact you
                  about your use of our Website.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">
                    To enable user-to-user communications.
                  </span>{" "}
                  We may use your information in order to enable user-to-user
                  communications with each user's consent.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">To manage user accounts. </span>{" "}
                  We may use your information for the purposes of managing our
                  account and keeping it in working order.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">
                    To send administrative information to you.
                  </span>{" "}
                  We may use your personal information to send you product,
                  service and new feature information and/or information about
                  changes to our terms, conditions, and policies.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">To protect our Services.</span> We
                  may  We may use your information as part of our efforts to
                  keep our Website safe and secure (for example, for fraud
                  monitoring and prevention).
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">
                    To enforce our terms, conditions and policies for business
                    purposes, to comply with legal and regulatory requirements
                    or in connection with our contract.
                  </span>
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">
                    To respond to legal requests and prevent harm.
                  </span>{" "}
                  If we receive a subpoena or other legal request, we may need
                  to inspect the data we hold to determine how to respond.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-3" id="third-section">
            <p className="text-center font-bold" id="#third-section">
              3 WILL YOUR INFORMATION BE SHARED WITH ANYONE?
            </p>
            <i>
              In Short:  We process your information for purposes based on
              legitimate business interests, the fulfillment of our contract
              with you, compliance with our legal obligations, and/or your
              consent.
            </i>
            <p className="mt-3">
              We use personal information collected via our Website for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations. We indicate the specific processing grounds
              we rely on next to each purpose listed below.
            </p>

            <p className="mt-3">
              We use the information we collect or receive:
            </p>
            <p className="ml-5 mt-3 flex">
              <ul>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">Consent:</span> We may process
                  your data if you have given us specific consent to use your
                  personal information for a specific purpose.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold"> Legitimate Interests: </span>
                  We may process your data when it is reasonably necessary to
                  achieve our legitimate business interests.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">
                    {" "}
                    Performance of a Contract:{" "}
                  </span>
                  Where we have entered into a contract with you, we may process
                  your personal information to fulfill the terms of our
                  contract.
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">Legal Obligations:</span> We may
                  disclose your information where we are legally required to do
                  so in order to comply with applicable law, governmental
                  requests, a judicial proceeding, court order, or legal
                  process, such as in response to a court order or a subpoena
                  (including in response to public authorities to meet national
                  security or law enforcement requirements).
                </li>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold"> Vital Interests:  </span> We may
                  disclose your information where we believe it is necessary to
                  investigate, prevent, or take action regarding potential
                  violations of our policies, suspected fraud, situations
                  involving potential threats to the safety of any person and
                  illegal activities, or as evidence in litigation in which we
                  are involved.
                </li>

                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">To protect our Services.</span> We
                  may  We may use your information as part of our efforts to
                  keep our Website safe and secure (for example, for fraud
                  monitoring and prevention).
                </li>
                <p className="mt-3 mb-3">
                  More specifically, we may need to process your data or share
                  your personal information in the following situations:
                </p>
                <li style={{ color: "white", listStyle: "inside" }}>
                  <span className="font-bold">Business Transfers:</span>
                  We may share or transfer your information in connection with,
                  or during negotiations of, any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business
                  to another company.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="fourth-section">
            <p className="text-center font-bold">
              4 HOW DO WE HANDLE YOUR SOCIAL LOGINS?     
            </p>
            <i>
              In Short:  If you choose to register or log in to our services
              using a social media account, we may have access to certain
              information about you.
            </i>
            <p className="mt-3 flex">
              Our Website offers you the ability to register and login using
              your third-party social media account details (like your Facebook
              or Twitter logins). Where you choose to do this, we will receive
              certain profile information about you from your social media
              provider. The profile information we receive may vary depending on
              the social media provider concerned, but will often include your
              name, email address, friends list, profile picture as well as
              other information you choose to make public on such social media
              platform.
            </p>
            <p className="mt-3" flex>
              We will use the information we receive only for the purposes that
              are described in this privacy notice or that are otherwise made
              clear to you on the relevant Website. Please note that we do not
              control, and are not responsible for, other uses of your personal
              information by your third-party social media provider. We
              recommend that you review their privacy notice to understand how
              they collect, use and share your personal information, and how you
              can set your privacy preferences on their sites and apps.
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="fifth-section">
            <p className="text-center font-bold">
              5 IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?     
            </p>
            <i>
              In Short:  We may transfer, store, and process your information in
              countries other than your own.
            </i>
            <p className="mt-3 flex">
              Our servers are located in. If you are accessing our Website from
              outside, please be aware that your information may be transferred
              to, stored, and processed by us in our facilities and by those
              third parties with whom we may share your personal information
              (see "WILL YOUR INFORMATION BE SHARED WITH ANYONE?" section
              above), in and other countries.
            </p>
            <p className="mt-3" flex>
              If you are a resident in the European Economic Area (EEA) or
              United Kingdom (UK), then these countries may not necessarily have
              data protection laws or other similar laws as comprehensive as
              those in your country. We will however take all necessary measures
              to protect your personal information in accordance with this
              privacy notice and applicable law.
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="sixth-section">
            <p className="text-center font-bold">
              6 HOW LONG DO WE KEEP YOUR INFORMATION? 
            </p>
            <i>
              In Short:  We keep your information for as long as necessary to
              fulfill the purposes outlined in this privacy notice unless
              otherwise required by law.
            </i>
            <p className="mt-3 flex">
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting or other legal requirements). No purpose in this
              notice will require us keeping your personal information for
              longer than the period of time in which users have an account with
              us.
            </p>
            <p className="mt-3" flex>
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="seventh-section">
            <p className="text-center font-bold">
              7 HOW DO WE KEEP YOUR INFORMATION SAFE?
            </p>
            <i>
              In Short:  We aim to protect your personal information through a
              system of organizational and technical security measures.
            </i>
            <p className="mt-3 flex flex-col">
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure, so we cannot promise or guarantee
              that hackers, cybercriminals, or other unauthorized third parties
              will not be able to defeat our security, and improperly collect,
              access, steal, or modify your information. Although we will do our
              best to protect your personal information, transmission of
              personal information to and from our Website is at your own risk.
              You should only access the Website within a secure environment.
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="eight-section">
            <p className="text-center font-bold">
              8 WHAT ARE YOUR PRIVACY RIGHTS?
            </p>
            <i>
              In Short:  You may review, change, or terminate your account at
              any time.
            </i>
            <p className="mt-3">
              If you are a resident in the EEA or UK and you believe we are
              unlawfully processing your personal information, you also have the
              right to complain to your local data protection supervisory
              authority. You can find their contact details
              <a
              className ="ml-3"
                style={{ color: "blue" }}
                href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm."
              >
                here
              </a>
            </p>
            <p>
              If you are a resident in Switzerland, the contact details for the
              data protection authorities are available
              <a
                  className ="ml-3"
                style={{ color: "blue" }}
                href=" https://www.edoeb.admin.ch/edoeb/en/home.html"
              >
                here
              </a>
            </p>
            <p>
              If you have questions or comments about your privacy rights, you
              may email us at admin@viewingparty.net.
            </p>
            <p className="mt-3">
              <h2 className="font-bold">Account Information</h2>
              <h3>
                If you would at any time like to review or change the
                information in your account or terminate your account, you can:
              </h3>
              <ul>
                <li style={{ color: "white", listStyle: "inside" }}>
                  Log in to your account settings and update your user account.
                </li>
              </ul>
              <h3>
                Upon your request to terminate your account, we will deactivate
                or delete your account and information from our active
                databases. However, we may retain some information in our files
                to prevent fraud, troubleshoot problems, assist with any
                investigations, enforce our Terms of Use and/or comply with
                applicable legal requirements.
              </h3>
              <h3 className="mt-3">
                <span className="font-bold">
                  Opting out of email marketing:
                </span>
                You can unsubscribe from our marketing email list at any time by
                clicking on the unsubscribe link in the emails that we send or
                by contacting us using the details provided below. You will then
                be removed from the marketing email list — however, we may still
                communicate with you, for example to send you service-related
                emails that are necessary for the administration and use of your
                account, to respond to service requests, or for other
                non-marketing purposes. To otherwise opt-out, you may:
              </h3>
              <ul>
                <li style={{ color: "white", listStyle: "inside" }}>
                  Access your account settings and update your preferences.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="nineth-section">
            <p className="text-center font-bold">
              9 CONTROLS FOR DO-NOT-TRACK FEATURES
            </p>

            <p className="mt-3 flex flex-col">
              Most web browsers and some mobile operating systems and mobile
              applications include a Do-Not-Track ("DNT") feature or setting you
              can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. At
              this stage no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not
              currently respond to DNT browser signals or any other mechanism
              that automatically communicates your choice not to be tracked
              online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a
              revised version of this privacy notice. 
            </p>
          </div>

          <div className="mt-3 flex flex-col" id="tenth-section">
            <p className="text-center font-bold">
              10 DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </p>
            <i>
              In Short:  Yes, if you are a resident of California, you are
              granted specific rights regarding access to your personal
              information.
            </i>
            <p className="mt-3 flex">
              California Civil Code Section 1798.83, also known as the "Shine
              The Light" law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.
            </p>
            <p className="mt-3" flex>
              If you are under 18 years of age, reside in California, and have a
              registered account with the Website, you have the right to request
              removal of unwanted data that you publicly post on the Website. To
              request removal of such data, please contact us using the contact
              information provided below, and include the email address
              associated with your account and a statement that you reside in
              California. We will make sure the data is not publicly displayed
              on the Website, but please be aware that the data may not be
              completely or comprehensively removed from all our systems (e.g.
              backups, etc.).
            </p>
          </div>

          <div className="mt-3 flex flex-col" id="eleventh-section">
            <p className="text-center font-bold">
              11 DO WE MAKE UPDATES TO THIS NOTICE?
            </p>
            <i>
              In Short:  Yes, we will update this notice as necessary to stay
              compliant with relevant laws.
            </i>
            <p className="mt-3 flex">
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated "Revised" date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy notice, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </p>
          </div>
          <div className="mt-3 flex flex-col" id="twelveth-section">
            <p className="text-center font-bold">
              12 HOW CAN YOU CONTACT US ABOUT THIS NOTICE? 
            </p>
            <i>
              In Short:  Yes, we will update this notice as necessary to stay
              compliant with relevant laws.
            </i>
            <p className="mt-3 flex">
              If you have questions or comments about this notice, you may email
              us at admin@viewingparty.net or by post to: Viewing Party LLC,New
              York City, NY United States
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
