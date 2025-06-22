import React, { useState } from 'react';

const BlogEntry: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a backend
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Enter a New Blog Post</h2>
            {submitted ? (
                <div>
                    <h3>Blog Submitted!</h3>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Content:vgfgvjvhj
                        This is a normal blog regarding the partigipant regarding the summer event organized by hackclub.
                        I am one of the participate of the hackclub but faced a lot of issues regarding this regestration.
                        <p>Like the shit i am doing here is distusing , and i am happy that i have made my working hours near about 5 hours and 45 minutes. 
                            </p></strong> {content}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Title:Quantum Computing +aaaaaaaaaaaaaaAttal <main>I am not getting whats going on here. Is this title or what what are you aming about bro. 
                                The baxk attack is goood not best content for the uoutube . I am just learning <a href="about typong "></a> .</main>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                style={{ width: '100%', padding: 8, marginTop: 4 }}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Content:
                            <p style={{ fontStyle: 'italic', color: '#555', marginBottom: 8 }}>
                                Quantum computing is a fascinating field. It uses principles of quantum mechanics to process information in ways that classical computers cannot. 
                                <br />
                                Unlike traditional bits, quantum bits (qubits) can exist in multiple states at once. This property is called superposition.
                                <br /><p>   It is currently running on port  3743 , now we can manipulate the whole system . okay
                                now lets  dive into the deep. What is powershell </p>
                                Quantum computers also use entanglement, allowing qubits to be linked together. This can make certain computations much faster.
                                <br />
                                The technology is still in its early stages, but it holds great promise for the future.
                                Now , the future is here and we are using the quantum computing in our daily life.
                                Okay quantum comuting is a facinating field, okay my thought about quantum computing is quite simole                            

                                and i am not getting whats going on here. Is this title or what what are you aming about bro.
                            </p><p>
                            {/* 
                       This is a simple React component for submitting a blog post.
                                - Uses useState to manage form fields and submission state.
                                - Displays a form with Title and Content fields.
                                - On submit, shows the entered data.
                                - Styling is done inline for simplicity.
                                - No backend integration; submission is local only.
                                You can use this as a starting point for a blog entry form in any React app.
                            */}
                            </p>
                            <p style={{ fontStyle: 'italic', color: '#555', marginBottom: 8 }}>
                                Quantum computing is a fascinating field. It uses principles of quantum mechanics to process information in ways that classical computers cannot.
                                Unlike traditional bits, quantum bits (qubits) can exist in multiple states at once. This property is called superposition.
                                Quantum computers also use entanglement, allowing qubits to be linked together. This can make certain computations much faster.
                                The technology is still in its early stages, but it holds great promise for the future.......
                                .........................................................................................
                                ..............................................................................................................................
                                <div className=".
                                .
                                .
                                .
                                .
                                .
                                .
                                ...
                                ..
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                ...
                                .
                                .
                                .
                                .
                                .
                                .
                                ........
                                .
                                .
                                .
                                .
                                .
                                .
                                ..
                                ...
                                ..
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                .
                                "></div>
                                ............................................................................................f     </p>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                style={{ width: '100%', padding: 8, marginTop: 4, minHeight: 110 }}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit" style={{ padding: '8px 16px' }}>Submit</button>
                </form>
            )}
        </div>
    );
};

export default BlogEntry;