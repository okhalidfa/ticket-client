import SigninForm from './SigninForm';

export default function SigninPage() {
    return (
        <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16">
            <div className="card p-8">
                <h1 className="mb-6 text-center text-2xl font-bold">Welcome back</h1>
                <SigninForm />
            </div>
        </div>
    );
}
