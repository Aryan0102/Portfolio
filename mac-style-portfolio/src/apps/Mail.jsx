import Window from "../components/Window";
import { FaInbox } from "react-icons/fa";
import { IoFlagOutline, IoDocumentOutline } from "react-icons/io5";
import { GoPaperAirplane } from "react-icons/go";

const mailSections = [
  {
    text: "Inbox",
    number: "1012",
    icon: <FaInbox />,
    selected: true
  },
  {
    text: "Flagged",
    number: "283",
    icon: <IoFlagOutline />,
    selected: false
  },
  {
    text: "Drafts",
    number: "15",
    icon: <IoDocumentOutline />,
    selected: false
  },
  {
    text: "Sent",
    number: "93",
    icon: <GoPaperAirplane />,
    selected: false
  },
]

const actualMail = [
  {
    sender: "Discover",
    date: "12:38",
    subject: "Earn 5% Cashback",
    text: "Congrats on your new card, earn 5% on groceries, gas, and other everyday purchases"
  },
  {
    sender: "GitHub",
    date: "08:22",
    subject: "Security Alert: New Login",
    text: "A login was detected from a new device. If this wasn’t you, please review your account security settings."
  },
  {
    sender: "Northeastern University",
    date: "09:51",
    subject: "Course Registration Open",
    text: "Registration for Fall 2025 is now open. Log in to student hub to select your classes before spots fill up."
  },
  {
    sender: "Amazon",
    date: "11:15",
    subject: "Your Order Has Shipped",
    text: "Your package with 3 items is on its way. Track your shipment for the latest delivery updates."
  },
  {
    sender: "LinkedIn",
    date: "13:08",
    subject: "5 New Jobs for You",
    text: "Based on your profile, we found new software engineering positions in your area. Apply now to get noticed."
  },
  {
    sender: "Google",
    date: "10:03",
    subject: "Password Change Confirmation",
    text: "Your Google account password was changed. If you didn’t make this change, reset your password immediately."
  },
  {
    sender: "Spotify",
    date: "07:45",
    subject: "Your 2025 Wrapped is Here",
    text: "See your top songs and artists of the year, plus new personalized playlists just for you."
  },
  {
    sender: "Robinhood",
    date: "14:29",
    subject: "Account Statement Available",
    text: "Your monthly account statement is ready to view. Download your statement to keep track of your investments."
  },
  {
    sender: "Apple",
    date: "15:17",
    subject: "Your Receipt from Apple",
    text: "Thank you for your recent purchase on the App Store. View your receipt for details on your transaction."
  },
  {
    sender: "Slack",
    date: "16:04",
    subject: "Missed Messages",
    text: "You have 8 unread messages in the Bonvoya workspace. Check Slack to catch up on team updates."
  },
  {
    sender: "Stripe",
    date: "17:30",
    subject: "Payment Successful",
    text: "Your payment of $54.99 was processed successfully. View your invoice or manage your subscriptions online."
  },
];

const Mail = () => {
  return (
    <Window
      appName="Mail"
      width={1000}
      height={600}
      children={
        <div className="bg-gray-900 w-full h-full rounded-b-lg flex">
          {/* Left Side/Inboxes */}
          <div className="w-[20%] h-full p-4 flex flex-col items-center bg-gray-800">
            <p className="text-gray-200 w-full text-left text-xs mb-1">Favorites</p>
            {mailSections.map((section) => (
              <div
                key={section.text}
                className={`px-2 py-1 w-full ${section.selected ? "bg-gray-700" : ""} rounded mb-2 flex items-center justify-between`}
              >
                <p className="text-blue-500 w-[20%] text-left">{section.icon}</p>
                <p className="text-white text-xs w-[40%] text-left">{section.text}</p>
                <p className="text-white text-xs w-[40%] text-right">{Number(section.number).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Center/Mails */}
          <div className="w-[30%] h-full py-4 px-1 flex flex-col items-center border-r border-l overflow-auto no-scrollbar">
            <div className="w-full flex flex-col text-white">
              {actualMail.map((mail) => (
                <div className="w-full px-4  flex flex-col text-white">
                  <div className="flex justify-between items-center">
                    <p className="text-sm w-[60%] font-bold truncate">{mail.sender}</p>
                    <p className="text-xs">{mail.date}</p>
                  </div>
                  <p className="truncate text-xs font-bold">{mail.subject}</p>
                  <p className="line-clamp-2 text-xs text-gray-300">{mail.text}</p>
                  <hr className="mt-1 mb-2 text-gray-600/50"/>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Contact Form */}
          <div className="w-[50%] h-full flex flex-col">
            {/* Header */}
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-white">New Message</h1>
              <p className="text-sm text-gray-400 mt-1">Contact Me Directly</p>
              <hr className="text-gray-700 mt-3"/>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-auto px-6 py-4">
              <form
                className="space-y-4"
                action="https://formspree.io/f/mvgovkeq"
                method="POST"
              >
                {/* "To" Section */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
                  <p className="text-sm text-gray-400 w-5">To:</p>
                  <p className="flex-1 text-gray-300 text-sm">aryansumit0102@gmail.com</p>
                </div>

                {/* From Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="first-name"
                      placeholder="First Name"
                      required
                      className="w-full bg-neutral-800 text-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="last-name"
                      placeholder="Last Name"
                      required
                      className="w-full bg-neutral-800 text-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-neutral-800 text-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone-number"
                      placeholder="Phone Number"
                      required
                      className="w-full bg-neutral-800 text-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
                  <label className="text-sm text-gray-400 w-16">Subject:</label>
                  <select
                    name="choose-topic"
                    required
                    className="flex-1 bg-transparent text-gray-300 text-sm focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="">Select a topic...</option>
                    <option value="Projects/Experiences">Projects/Experiences</option>
                    <option value="Research">Research</option>
                    <option value="Northeastern Information">Northeastern Information</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={8}
                    placeholder="Type your message here..."
                    required
                    className="w-full bg-neutral-800 text-gray-300 text-sm px-3 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Alternative Contact Info */}
                <div className="bg-neutral-800 rounded-md p-4 text-xs text-gray-400">
                  <p className="font-medium text-gray-300 mb-1">Alternative Contact Methods:</p>
                  <p>Phone: +1 (570) 236-4213</p>
                  <p>Email: aryansumit0102@gmail.com</p>
                </div>

                {/* Send Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center gap-2"
                  >
                    <GoPaperAirplane />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Mail