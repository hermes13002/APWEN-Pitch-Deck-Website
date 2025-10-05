import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-4 font-orbitron">Contact Us</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-100 max-w-3xl mx-auto font-ubuntu">
            Have questions about Nexus Hackathon 2.0? Our team is here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 bg-pink-100 rounded-full p-3 text-pink-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1 font-poppins">Email</h4>
                  <p className="text-gray-700 font-ubuntu">apwen@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-pink-100 rounded-full p-3 text-pink-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1 font-poppins">Phone</h4>
                  <p className="text-gray-700 font-ubuntu">+234-1234567890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-pink-100 rounded-full p-3 text-pink-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1 font-poppins">Venue</h4>
                  <p className="text-gray-700 font-ubuntu">LASU Epe Campus</p>
                  <p className="text-gray-500 font-ubuntu">Lagos State, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-orbitron font-medium transition-colors shadow-md inline-block text-center"
              >
                Register
              </a>
              {/* <a
                href="https://drive.google.com/drive/folders/1RBu_yvnFR0QdVTZKPMxxtDJUC_XS2Tqd?usp=drive_link"
                download
                className="bg-white hover:bg-gray-100 text-pink-500 px-6 py-3 rounded-lg font-orbitron font-medium transition-colors shadow-md inline-block border border-pink-500 text-center"
              >
                Download Guide
              </a> */}
            </div>
          </div>

          <div className="h-80 md:h-auto rounded-xl overflow-hidden shadow-md">
            {/* <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4969082346947!2d3.6009809753061004!3d6.585349393440338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103954de0b731287%3A0x435be037801503c0!2sLagos%20State%20University%2C%20Epe%20Campus!5e0!3m2!1sen!2sng!4v1686506548651!5m2!1sen!2sng" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="LASU Epe Campus Map"
            ></iframe> */}
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4228628498154!2d3.991570534887703!3d6.594249700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039471c10863f8d%3A0x792b76ef90513491!2sLAGOS%20STATE%20UNIVERSITY%20EPE%20CAMPUS!5e0!3m2!1sen!2sng!4v1748746751444!5m2!1sen!2sng"
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="LASU Epe Campus Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;