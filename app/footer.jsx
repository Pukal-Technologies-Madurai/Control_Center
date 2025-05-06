function Footer() {
    return (
      <footer className="bg-gray-100 mt-auto py-8">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Version</span> 3.1.1
            </p>
            <p className="text-sm text-gray-600">
              Copyright &copy; 2014-2021{" "}
              <a 
                href="https://pukaltechnologies.in" 
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 underline hover:no-underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                PUKAL TECH
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;