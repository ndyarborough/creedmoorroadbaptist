// src/components/Footer.tsx
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'

export default function Footer() {
    return (
        <footer className="flex flex-col bg-bg-footer text-center pt-8">
            <div className='md:flex md:justify-around md:pb-8'>
                {/* Brand */}
                <div className="footer-brand space-y-2">
                    <div className='flex justify-center items-center'>
                        <img src="/logo.svg" alt="Cornerstone Church logo" className="footer-logo size-7" />
                        <h2 className="footer-header">Creedmoor Road Baptist Church</h2>
                    </div>
                    <p className="footer-link">A place to belong, believe, and become.</p>
                    {/* Social Icons */}
                    <div className="footer-social py-2">
                        <a href="https://facebook.com/YourPage" aria-label="Facebook">
                            <FacebookIcon fontSize="large" className='text-text-footer' />
                        </a>
                        <a href="https://youtube.com/YourChannel" aria-label="YouTube">
                            <YouTubeIcon fontSize="large" className='text-text-footer' />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div className='flex justify-around py-4 md:py-0 text-left'>
                    <div className='space-y-2 md:space-x-8'>
                        <h3 className="footer-header">Quick Links</h3>
                        <ul className='space-y-2'>
                            <li className='footer-link'><a href="/about">About Us</a></li>
                            <li className='footer-link'><a href="/messages">Sermons</a></li>
                            <li className='footer-link'><a href="/events">Events</a></li>
                            <li className='footer-link'><a href="/smallGroups">Ministries</a></li>
                        </ul>
                    </div>
                    <div className='space-y-2 md:space-x-8'>
                        <h3 className="footer-header">Service Times</h3>
                        <ul className='space-y-2'>
                            <li className='footer-link'>
                                <span>Sunday</span>{" "}
                                <span>9:00 AM &amp; 11:00 AM</span>
                            </li>
                            <li className='footer-link'>
                                <span>Wednesday</span>{" "}
                                <span>7:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr className="bg-gray-body-footer" />

            {/* Copyright */}
            <div className="footer-bottom">
                <p className="footer-copyright py-2">© {new Date().getFullYear()} Creedmoor Road Baptist Church. All rights reserved.</p>
            </div>
        </footer>
    )
}
