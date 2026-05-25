const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 my-32 px-4">
      <h1 className="font-semibold text-2xl md:text-4xl text-info">Never Miss Anything!</h1>
      <p className="md:text-lg text-warning">Subscribe to receive the latest news.</p>
      <form className="join w-full max-w-2xl">
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          className="join-item input input-bordered w-full"
        />
        <button type="submit" className="join-item btn btn-primary">
          Subscribe
        </button>
      </form>
    </div>
  );
};
export default Newsletter;
