import React from 'react';
import { BookOpen, Headphones, Mic2, Music } from 'lucide-react';
import aboutImage from '/images/aboutimage.jpg';

const About = () => {
  return (
    <div className="about-section">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        About The Listening Lounge
      </h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <div>
          <p className="text-lg mb-6">
            Welcome to The Listening Lounge, your sanctuary for all things audio. We're more than just a podcast platform; we're a community built on a shared love for storytelling, music, and insightful conversations.
          </p>
          <p className="text-lg mb-6">
            Our journey began with a simple idea: to create a space where listeners can escape the noise of everyday life and immerse themselves in rich, diverse content. Whether you're seeking thought-provoking discussions, captivating narratives, or the latest musical discoveries, The Listening Lounge has something for you.
          </p>
          <p className="text-lg">
            We believe in the power of audio to connect us, to inspire us, and to broaden our horizons. Join us as we explore the world, one episode at a time.
          </p>
        </div>

        {/* Right Column: Image/Visual */}
        <div className="rounded-lg overflow-hidden shadow-lg flex items-start">
          <img
            src={aboutImage}
            alt="A person listening to headphones in a lounge"
            className="w-full h-auto object-cover"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4 flex items-center gap-2">
          <Mic2 className="w-6 h-6 text-purple-400" />
          Our Mission
        </h2>
        <p className="text-lg">
          To curate and deliver high-quality audio content that entertains, informs, and inspires our listeners. We strive to create a platform that fosters connection and celebrates the diversity of human experience.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4 flex items-center gap-2">
          <Headphones className="w-6 h-6 text-pink-400" />
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-lg">
          <li>A diverse selection of podcasts, covering a wide range of genres.</li>
          <li>Curated music playlists, perfect for any mood or occasion.</li>
          <li>Engaging interviews with creators, artists, and thought leaders.</li>
          <li>A vibrant community where listeners can connect and share their passion for audio.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          Our Values
        </h2>
        <ul className="list-disc list-inside text-lg">
          <li>
            <strong>Quality:</strong> We are committed to delivering exceptional audio experiences.
          </li>
          <li>
            <strong>Diversity:</strong> We celebrate a wide range of voices and perspectives.
          </li>
          <li>
            <strong>Community:</strong> We foster a welcoming and inclusive space for our listeners.
          </li>
          <li>
            <strong>Innovation:</strong> We are constantly exploring new ways to enhance the listening experience.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-12 mb-4 flex items-center gap-2">
          <Music className="w-6 h-6 text-emerald-400" />
          Get Involved
        </h2>
        <p className="text-lg mb-4">
          The Listening Lounge is more than just a platform; it's a community. We encourage you to connect with us and share your thoughts. Here are a few ways to get involved:
        </p>
        <ul className="list-disc list-inside text-lg">
          <li>Stay updated with the latest news and announcements on our platform.</li>
          <li>Connect with us on our social media channels for discussions and updates.</li>
          <li>Share the content you enjoy with your network.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
