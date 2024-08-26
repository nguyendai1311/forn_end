import React, { useEffect } from 'react';

const CommentComponent = (props) => {
  const { dataHref } = props;

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse(); 
    }
  }, [dataHref]);

  return (
    <div style={{ margin: '-10px -12px 0' }}>
      <div className="fb-comments" data-href="https://forn-end-nguyendais-projects.vercel.app/" data-width="1270" data-numposts="5"></div>
    </div>
  );
};

export default CommentComponent;
