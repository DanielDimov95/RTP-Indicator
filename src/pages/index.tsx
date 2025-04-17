export { default } from './tournament-page';

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/tournament-page',
      permanent: true,
    },
  };
} 