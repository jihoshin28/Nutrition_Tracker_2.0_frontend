import React, {useState, useEffect} from 'react'

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

const grammar = '#JSGF V1.0; grammar numbers; public <number> = one | two | three | four | five | six | seven | eight| nine | ten ;'
var recognition = new SpeechRecognition()
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const RecordButton = (props) => {
    
    let[ref] = useState(React.createRef())

    let startSpeechToText = () => {
        recognition.start()
        ref.current.classList.remove('pulsate')
        ref.current.classList.add('recording-pulsate')
    }

    recognition.onresult = (event) => {
        var text = event.results[0][0].transcript
        var confidence = event.results[0][0].confidence
        props.setResults(text, confidence, props.type)
    }
    
    recognition.onspeechend = () => {
        recognition.stop()
        ref.current.classList.remove('recording-pulsate')
        ref.current.classList.add('pulsate')
    }

    return (
        <div class = "record-box">
            <button ref = {ref} type = 'button' onClick = {startSpeechToText} class = "pulsate"></button>
        </div>
    )
}

export default RecordButton