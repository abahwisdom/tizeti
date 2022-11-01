import React from 'react';

function Error({
	errorMessage,
}) {
	return <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in" style={{display:errorMessage!==""?'block':'none'}}>{errorMessage}</div>
}

export default Error;
