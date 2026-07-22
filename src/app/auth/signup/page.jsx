import SignupForm from './SignupForm';

export default function SignupPage() {
    return (
        <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16">
            <div className="card p-8">
                <h1 className="mb-6 text-center text-2xl font-bold">Create your account</h1>
                <SignupForm />
            </div>
        </div>
    );
}
