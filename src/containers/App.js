import {Grid, Header, Form, Button, Segment, Image, Message} from "semantic-ui-react";
import React from "react";
import axios from "axios";


function App() {
    const [file, setFile] = React.useState("");
    const [loader, setLoader] = React.useState(false);
    const [activeDownload, setActiveDownload] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const [error, setError] = React.useState("");
    const fileInputRef = React.useRef(null);


    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmission = () => {
        setLoader(true)

        const config = {
            responseType: 'blob'
        }

        const formData = new FormData()
        formData.append('File', file);

        axios
            .post('https://whispering-tor-85579.herokuapp.com/api/upload/' + file.name, formData, config)
            .then((response) => {
                const mp3 = new Blob([response.data], {type: 'audio/mp3'})
                const url = window.URL.createObjectURL(mp3)
                const link = document.createElement('a')
                setUrl(url)
                link.href = url
                link.download = mp3.name

                setActiveDownload(true)
                setLoader(false)
                setError("")
            })
            .catch((err) => {
                setError(err)
                setLoader(false)
                console.log(err)
            })
    }


    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h1' color='blue' textAlign='center'>
                    <Image src='static/sound.svg'/> Upload your audio file
                </Header>
                <Form loading={loader} onSubmit={handleSubmission}>
                    <Segment>
                        <Form.Field>
                            <Button
                                style={{width: "100%"}}
                                type="button"
                                content={file.name ? file.name : "Choose File"}
                                icon="music"
                                onClick={() => fileInputRef.current.click()}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".mp3"
                                hidden
                                onChange={changeHandler}
                            />
                        </Form.Field>
                        <Button.Group fluid size='big'>
                            <Button type="submit" icon='upload' content='Upload'/>
                            <Button.Or/>
                            <Button
                                as={'a'}
                                href={url}
                                disabled={!activeDownload}
                                icon='download'
                                content='Download'
                                positive
                                download
                            />
                        </Button.Group>
                    </Segment>
                </Form>

                { error ?
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>
                            error <b>special offers</b> page to see now.
                        </p>
                    </Message>
                :
                    ""
                }

                <Message>
                    About <a>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>


    );
}

export default App;