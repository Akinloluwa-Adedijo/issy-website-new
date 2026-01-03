const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-5 uppercase text-lg gap-5">
      <p className="text-lg uppercase text-neutral-400 hover:text-white transition-colors duration-300">
        <a
          href="mailto:info@issyidehen.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </p>
      <p className="text-lg uppercase text-neutral-400 hover:text-white transition-colors duration-300">
        <a
          href="https://www.instagram.com/donebyi?igsh=ZndpbnBuZGJ0bGxp&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </a>
      </p>
      <p className="text-lg uppercase text-neutral-400 hover:text-white transition-colors duration-300">
        <a
          href="https://www.tiktok.com/@issy.directs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tiktok
        </a>
      </p>

      <p>© 2025 Isioma Idehen. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
