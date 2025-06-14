export default function ContactMe() {
  return (
    <section id="contact" className="text-white py-16 px-4 sm:px-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-pink-600 mb-2">Contact Me</h2>
        <p className="text-white text-sm sm:text-base">
          Feel free to use this contact field, otherwise I am available at +1 (570)-236-4213 or aryansumit0102@gmail.com
        </p>
      </div>

      <form
        className="max-w-3xl mx-auto space-y-6"
        action="https://formspree.io/f/mvgovkeq"
        method="post"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm mb-1 text-white">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              required
              className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm mb-1 text-white">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              required
              className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          <div>
            <label htmlFor="phone-number" className="block text-sm mb-1 text-white">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone-number"
              name="phone-number"
              required
              className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="choose-topic" className="block text-sm mb-1 text-white">
            Choose Topic
          </label>
          <select
            id="choose-topic"
            name="choose-topic"
            required
            className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          >
            <option>Select One...</option>
            <option>Projects/Experiences</option>
            <option>Research</option>
            <option>Northeastern Information</option>
            <option>General Question</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm mb-1 text-white">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Type your message"
            required
            className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
