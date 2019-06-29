/**
 * Cross-Origin Resource Sharing (CORS) Settings
 * (sails.config.cors)
 *
 * CORS is like a more modern version of JSONP-- it allows your server/API
 * to successfully respond to requests from client-side JavaScript code
 * running on some other domain (e.g. google.com)
 * Unlike JSONP, it works with POST, PUT, and DELETE requests
 *
 * For more information on CORS, check out:
 * http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 *
 * Note that any of these settings (besides 'allRoutes') can be changed on a per-route basis
 * by adding a "cors" object to the route configuration:
 *
 * '/get foo': {
 *   controller: 'foo',
 *   action: 'bar',
 *   cors: {
 *     origin: 'http://foobar.com,https://owlhoot.com'
 *   }
 *  }
 *
 *  For more information on this configuration file, see:
 *  http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.cors.html
 *
 */

module.exports.security = {
  cors: {
    /***************************************************************************
    *                                                                          *
    * Allow CORS on all routes by default? If not, you must enable CORS on a   *
    * per-route basis by either adding a "cors" configuration object to the    *
    * route config, or setting "cors:true" in the route config to use the      *
    * default settings below.                                                  *
    *                                                                          *
    ***************************************************************************/

    allRoutes: true,

    /***************************************************************************
    *                                                                          *
    * Which domains which are allowed CORS access? This can be a               *
    * comma-delimited list of hosts (beginning with http:// or https://) or    *
    * "*" to allow all domains CORS access.                                    *
    *                                                                          *
    ***************************************************************************/

    allowOrigins: '*' /*[
      'http://localhost:3000'
    ],*/,

    /***************************************************************************
    *                                                                          *
    * Allow cookies to be shared for CORS requests?                            *
    *                                                                          *
    ***************************************************************************/

    // credentials: true,

    /***************************************************************************
    *                                                                          *
    * Which methods should be allowed for CORS requests? This is only used in  *
    * response to preflight requests (see article linked above for more info)  *
    *                                                                          *
    ***************************************************************************/

    allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',

    /***************************************************************************
    *                                                                          *
    * Which headers should be allowed for CORS requests? This is only used in  *
    * response to preflight requests.                                          *
    *                                                                          *
    ***************************************************************************/

    allowRequestHeaders: ['content-type'],
  },

  /**
   * Cross-Site Request Forgery Protection Settings
   * (sails.config.csrf)
   *
   * CSRF tokens are like a tracking chip.  While a session tells the server that a user
   * "is who they say they are", a csrf token tells the server "you are where you say you are".
   *
   * When enabled, all non-GET requests to the Sails server must be accompanied by
   * a special token, identified as the '_csrf' parameter.
   *
   * This option protects your Sails app against cross-site request forgery (or CSRF) attacks.
   * A would-be attacker needs not only a user's session cookie, but also this timestamped,
   * secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.
   *
   * This allows us to have certainty that our users' requests haven't been hijacked,
   * and that the requests they're making are intentional and legitimate.
   *
   * This token has a short-lived expiration timeline, and must be acquired by either:
   *
   * (a)    For traditional view-driven web apps:
   *      Fetching it from one of your views, where it may be accessed as
   *      a local variable, e.g.:
   *      <form>
   *        <input type="hidden" name="_csrf" value="<%= _csrf %>" />
   *      </form>
   *
   * or (b) For AJAX/Socket-heavy and/or single-page apps:
   *      Sending a GET request to the `/csrfToken` route, where it will be returned
   *      as JSON, e.g.:
   *      { _csrf: 'ajg4JD(JGdajhLJALHDa' }
   *
   *
   * Enabling this option requires managing the token in your front-end app.
   * For traditional web apps, it's as easy as passing the data from a view into a form action.
   * In AJAX/Socket-heavy apps, just send a GET request to the /csrfToken route to get a valid token.
   *
   * For more information on CSRF, check out:
   * http://en.wikipedia.org/wiki/Cross-site_request_forgery
   *
   * For more information on this configuration file, including info on CSRF + CORS, see:
   * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.csrf.html
   *
   */

  /****************************************************************************
  *                                                                           *
  * Enabled CSRF protection for your site?                                    *
  *                                                                           *
  ****************************************************************************/

  csrf: false,
};
