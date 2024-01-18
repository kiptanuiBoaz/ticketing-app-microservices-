import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";
import buildclient from "../api/buildclient";

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <div className="container">
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    //makes the request to fetch the current user
    const client = buildclient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");

    /*
     * exposes the build client method and current user to getinitial props
     * in the child components
     */
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(
            appContext.ctx,
            client,
            data.currentUser
        );
    }

    return {
        pageProps,
        ...data,
    };
};

export default AppComponent;