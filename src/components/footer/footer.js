import React from 'react';

const Footer = () => {
    return (
        <footer className="top-buffer">
            <div className="container">
                <h1 className="logo clearfix">
                    Stock
                    <span>Exchange</span>
                    <span className="copyright">
                        &copy; 2019. All Rights Reserved.
                    </span>
                </h1>
                <h5 className="api-help">
                    API:
                    <a
                        href="https://iextrading.com/developer/docs/#getting-started"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        IEXTrading.com
                    </a>
                </h5>
            </div>
        </footer>
    );
};

export default Footer;
