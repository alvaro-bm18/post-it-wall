import React, { Component } from "react";
import Note from "./Note";
import './Styles/App.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            title: '',
            note: '',
            color: 'beige',
            muro: [],
            notifications: []
        };
        this.addNote = this.addNote.bind(this);
        this.setDataNote = this.setDataNote.bind(this);
        this.notify = this.notify.bind(this);
        this.fetchAllNotes = this.fetchAllNotes.bind(this);
    }
    addNote(e) {
        e.preventDefault();
        const { title, note } = this.state;

        const titleNote = title.trim();
        const noteDesc = note.trim();

        if (!titleNote || !noteDesc) {
            this.notify('err', 'Empty inputs, please fill them all');
            return;
        }

        const noteToSave = { title: titleNote, note: noteDesc, color: this.state.color };

        if (this.state._id) {
            fetch(`/notes/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(noteToSave),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => this.notify('log', data.status))
                .catch(err => this.notify('err', err));
            this.setState({ _id: '' });
        }
        else {
            fetch('/notes', {
                method: 'POST',
                body: JSON.stringify(noteToSave),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => this.notify('log', data.status))
                .catch(err => this.notify('err', err));
        }
        this.fetchAllNotes();
        this.setState({ title: '', note: '', color: 'beige' });
    }

    notify(type, message) {
        const currentNotifications = [...this.state.notifications];
        const newNotification = [{ type, message }];
        this.setState({ notifications: [...currentNotifications, ...newNotification] });
        setTimeout(() => {
            const notify = [...this.state.notifications];
            notify.shift();
            this.setState({ notifications: notify });
        }, 4000);
    }

    deleteNote(id) {
        fetch(`/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                this.notify('err', data.status);
                this.fetchAllNotes();
            })
            .catch(err => this.notify('err', err));
    }

    editeNote(id) {
        fetch(`/notes/${id}`)
            .then(res => res.json())
            .then(noteToEdit => {
                this.setState({
                    _id: noteToEdit._id,
                    title: noteToEdit.title,
                    note: noteToEdit.note
                });
            })
            .catch(err => this.notify('err', err));
    }

    componentDidMount() {
        this.fetchAllNotes();
    }

    fetchAllNotes() {
        this.notify('log', 'loading...');

        fetch('/notes')
            .then(res => res.json())
            .then(data => this.setState({ muro: data }))
            .catch(err => this.notify('err', err));
    }

    setDataNote(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    printMuro(notes) {
        const len = notes.length;
        if (len === 0) {
            return <div className="empty">no hay notas</div>;
        }

        if (len <= 3) {
            return (
                <div className="one-column">
                    {notes.map(note => <Note
                        title={note.title}
                        note={note.note}
                        edit={() => { this.editeNote(note._id) }}
                        delete={() => { this.deleteNote(note._id) }}
                        color={note.color}
                        key={note._id} />)}
                </div>
            );
        } else {
            const one = [];
            const two = [];
            const three = [];

            for (let n = 0; n < len; n++) {
                one.push(notes[n]);
                if (n + 1 < len) {
                    n++;
                    two.push(notes[n]);
                }
                else { break; }

                if (n + 1 < len) {
                    n++;
                    three.push(notes[n]);
                }
                else { break; }
            }

            return (
                <>
                    <div className="column-full">
                        {one?.map(note => <Note
                            title={note.title}
                            note={note.note}
                            edit={() => { this.editeNote(note._id) }}
                            delete={() => { this.deleteNote(note._id) }}
                            color={note.color}
                            key={note._id} />)}
                    </div>
                    <div className="column-full">
                        {two?.map(note => <Note
                            title={note.title}
                            note={note.note}
                            edit={() => { this.editeNote(note._id) }}
                            delete={() => { this.deleteNote(note._id) }}
                            color={note.color}
                            key={note._id} />)}
                    </div>
                    <div className="column-full">
                        {three?.map(note => <Note
                            title={note.title}
                            note={note.note}
                            edit={() => { this.editeNote(note._id) }}
                            delete={() => { this.deleteNote(note._id) }}
                            color={note.color}
                            key={note._id} />)}
                    </div>
                </>
            );
        }
    }

    render() {
        return (
            <>
                <header className="title-app">
                    <h2>Postick Muro</h2>
                </header>
                <section className="create-note-container">
                    <form
                        onSubmit={this.addNote}
                        className="create-note">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={this.setDataNote}
                            value={this.state.title}
                            autoComplete="off"
                            placeholder="Title" />
                        <textarea
                            id="note"
                            name="note"
                            onChange={this.setDataNote}
                            value={this.state.note}
                            placeholder="Note">
                        </textarea>
                        <div className="colors-options">
                            {['beige', 'pink', 'green', 'blue', 'purple'].map((color, index) => {
                                return (
                                    <button
                                        key={color.concat(index)}
                                        className={`${color} ${this.state.color === color ? 'selected' : ''}`.trim()}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.setState({ color: color });
                                        }}>
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            className="saveNote"
                            type="submit">
                            {this.state._id ? 'editar' : 'guardar'}
                        </button>
                    </form>
                </section>
                <section className="notes-muro">
                    {this.printMuro(this.state.muro)}
                </section>
                <footer>
                    <p>made with MERN stack</p>
                </footer>
                <div className="notification-section">
                    {
                        this.state.notifications.map((notify, index) => {
                            return (
                                <div
                                    className={notify.type}
                                    key={`notify-${index}`}>
                                    {notify.message}
                                </div>
                            )
                        })
                    }
                </div>
            </>
        );
    }
}