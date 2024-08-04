import React from 'react';

const DescriptionPage = () => {
  return (
    <div className="bg-zinc-900 text-white p-8 mb-16">
      <h1 className="text-3xl font-bold mb-4">YouTube-Twitter Hybrid Application</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Videos Page</h2>
        <p>
          The Videos Page allows you to search for videos by title or user. It also displays a list of videos based on your search criteria.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Tweet Page</h2>
        <p>
          On the Tweet Page, you can upload tweets and like other tweets. Clicking on a username will redirect you to the user dashboard of the tweet owner. You can create a new tweet by clicking the "+" button on the top right.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Upload Video</h2>
        <p>
          The Upload Video page allows you to upload videos as either private or public. You can set a thumbnail (less than 3MB) and the video size must be less than 30MB. After uploading, you will be redirected to your profile page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Subscription Page</h2>
        <p>
          The Subscription Page shows your subscribed channels and registered users. You can subscribe to users by clicking a button.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Profile Page</h2>
        <p>
          On the Profile Page, you can view your watch history, playlists, and liked videos. Clicking on a liked video link will redirect you to the liked videos page. You can also create playlists here.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Playlist Page</h2>
        <p>
          The Playlist Page allows you to edit, update, and delete playlists. You can also delete videos from playlists.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Liked Videos Page</h2>
        <p>
          On the Liked Videos Page, you can unlike videos.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Video Page</h2>
        <p>
          The Video Page allows you to like and comment on videos. You can also perform CRUD operations on comments if they belong to you.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">My Dashboard</h2>
        <p>
          In My Dashboard, you can update and delete your cover image and avatar. It displays your total subscribers, subscriptions, video views, and video likes. You can also view, update, and delete your videos and tweets here.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">User Dashboard</h2>
        <p>
          The User Dashboard allows you to subscribe to the user, view their profile, videos, and tweets.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Edit Video</h2>
        <p>
          The Edit Video page allows you to edit your videos.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Forget Password</h2>
        <p>
          By entering registered mail id you get an OTP to the mail enter it and also enter new Password to set new password.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">resources</h2>
        <p>
          some images are taken from Free pik and Some from pexels
        </p>
      </section>
    </div>
  );
};

export default DescriptionPage;
