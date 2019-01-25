import React from 'react';

function addDefaultSrc(e) {
    e.target.src = 'https://via.placeholder.com/250';
}

export const News = ({ news, stockName }) => {
    return (
        <div className="card top-50">
            <h3 className="underline">
                <span>{stockName} in news</span>
            </h3>
            <div className="card-body">
                {news && news.length
                    ? news.map((item, index) => {
                          return (
                              <div className="row" key={index}>
                                  <div className="col-md-3">
                                      <img
                                          src={item.image}
                                          onError={addDefaultSrc}
                                          className="img-responsive"
                                          alt="News Article"
                                      />
                                  </div>
                                  <div className="col-md-9">
                                      <div className="card-body">
                                          <div className="news-content">
                                              <a
                                                  href={item.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                              >
                                                  <h2>{item.headline}</h2>
                                              </a>
                                              <p>{item.summary}</p>
                                          </div>
                                          <div className="news-footer">
                                              <div className="news-author">
                                                  <ul className="list-inline list-unstyled">
                                                      <li className="list-inline-item text-secondary">
                                                          <i className="fa fa-user" />
                                                          {item.source}
                                                      </li>
                                                      <li className="list-inline-item text-secondary">
                                                          <i className="fa fa-calendar" />
                                                          {new Date(
                                                              item.datetime
                                                          ).toLocaleString()}
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};
