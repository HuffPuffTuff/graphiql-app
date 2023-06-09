import { useTranslation } from 'next-i18next';
import PageContainer from '@/components/PageContainer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext } from 'next';

import styles from './style.module.scss';
import { ErrorBoundaryWithMessage } from '@/components';

export default function WelcomePage() {
  const { t } = useTranslation();

  return (
    <>
      <ErrorBoundaryWithMessage>
        <Header />
      </ErrorBoundaryWithMessage>

      <PageContainer>
        <div className={styles.welcome}>
          <div className={styles['welcome__wrapper']}>
            <div className={styles['welcome__title-block']}>
              <h1 className={styles['welcome__title']}>{t('welcome.title')}</h1>
              <p className={styles['welcome__subtitle']}>{t('welcome.subtitle')}</p>
            </div>
            <div className={styles['welcome__description-block']}>
              <div className={styles['welcome__description__text']}>
                <div className={styles['welcome__text-block']}>
                  <p className={styles['welcome__text']}>{t('welcome.graphiQL')}</p>
                  <p className={styles['welcome__text']}>{t('welcome.rsschool')}</p>
                  <p className={styles['welcome__text']}>{t('welcome.course')}</p>
                </div>
                <p className={styles['welcome__developers__title']}>{t('welcome.team')}</p>
                <div className={styles['welcome__developers-block']}>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <picture>
                        <img
                          className={styles['welcome__developers__img']}
                          src="https://i.postimg.cc/9XppkcnP/image.jpg"
                          alt="photo"
                        />
                      </picture>

                      <p className={styles['welcome__developers__name']}>{t('welcome.Rodion')}</p>
                    </div>

                    <p className={styles['welcome__developers__description']}>
                      {t('welcome.Rodion-description')}
                    </p>
                  </div>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <picture>
                        <img
                          className={styles['welcome__developers__img']}
                          src="https://i.postimg.cc/T14WXNmx/image.jpg"
                          alt="photo"
                        />
                      </picture>

                      <p className={styles['welcome__developers__name']}>{t('welcome.Maria')}</p>
                    </div>
                    <p className={styles['welcome__developers__description']}>
                      {t('welcome.Maria-description')}
                    </p>
                  </div>
                  <div className={styles['welcome__developers']}>
                    <div>
                      <picture>
                        <img
                          className={styles['welcome__developers__img']}
                          src="https://i.postimg.cc/KcD2sgb9/image.png"
                          alt="photo"
                        />
                      </picture>

                      <p className={styles['welcome__developers__name']}>{t('welcome.Anna')}</p>
                    </div>
                    <p className={styles['welcome__developers__description']}>
                      {t('welcome.Anna-description')}
                    </p>
                  </div>
                </div>
              </div>
              <picture className={styles['welcome__description__img']}>
                <img src="/welcome-rocket.png" alt="rocket" />
              </picture>
            </div>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context;
  const currentLocale = locale || 'defaultLocale';

  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  };
};
