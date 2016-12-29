import React from 'react';

class NotFound extends React.Component {
        render() {
            return (

                <div className="not-found-wrapper">
                  <div className="over">404 Page Not Found</div>
                  <div className="under"><a href="/">Go Home</a></div>
               </div>
            )
        }
}

export default NotFound;
