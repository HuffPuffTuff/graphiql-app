import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { ErrorBoundary } from 'react-error-boundary';

import { registerWithEmailAndPassword } from '@/firebase/firebaseClient';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import ROUTES from '@/constants/routes';
import AuthView from '@/components/authView';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ErrorBoundaryWithMessage } from '@/components';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    return {
      redirect: {
        permanent: false,
        destination: ROUTES.APP,
      },
      props: {
        uid,
      },
    };
  } catch (err) {
    const locale = ctx.locale || 'en';

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
};

const SignUp = () => {
  const onSignUp = async (email: string, password: string) => {
    return await registerWithEmailAndPassword(email, password);
  };

  return (
    <ErrorBoundaryWithMessage>
      <AuthView authCallback={onSignUp} page="SIGN_UP" />
    </ErrorBoundaryWithMessage>
  );
};

export default SignUp;
