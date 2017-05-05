

var x2js = new X2JS({
  attributePrefix: '@',
});

function createMei(measures) {
  return {
    "mei": {
      "meiHead": {},
      "music": {
        "body": {
          "mdiv": {
            "score": {
              "scoreDef": {
                "staffGrp": {
                  "staffDef": {
                    "@xml:id": "staffDef-1",
                    "@clef.shape": "G",
                    "@clef.line": "2",
                    "@key.sig": "0", // e.g. 2f
                    "@meter.count": "4",
                    "@meter.unit": "4",
                    "@n": "1",
                    "@lines": "5"
                  },
                  "@xml:id": "staffGrp-1",
                  "@symbol": "bracket",
                  "@barthru": "true"
                },
                "@xml:id": "scoreDef-1",
                "@midi.bpm": "138"
              },
              "section": {
                "measure": measures
              }
            }
          }
        }
      },
      "@xmlns": "http:\/\/www.music-encoding.org\/ns\/mei",
      "@meiversion": "3.0.0"
    }
  }
}

function addNotes(layer, notes) {
  layer["note"] = [{
    "@xml:id": "note-1",
    "@dur": "1",
    "@oct": "4",
    "@pname": "e",
    "@accid.ges": "n"
  }];
}

function addHarmony(measure, chord, tstamp) {
  var harm = measure['harm'];
  if (!harm) {
    var harm = [];
    measure['harm'] = harm;
  }
  harm.push({
    "rend": "Cmaj7",
    "@place": "above",
    "@staff": "1",
    "@tstamp": "1"
  });
}

function createMeasures(chords) {
  var measures = [];
  chords.forEach(function(chord, mIdx) {
    measures.push(createMeasure([chord], mIdx.toString()));
  });
  return measures
}

function createMeasure(chords, mIdx) {
  var harm = [];
  var measure = {
    "harm": harm,
    "staff": {
      "layer": {
        "@xml:id": "layer-1",
        "@n": "1",
        // "note": [{
        //   "@xml:id": "note-1",
        //   "@dur": "1",
        //   "@oct": "4",
        //   "@pname": "e",
        //   "@accid.ges": "n"
        // }]
        "mRest": {
          "@xml:id": 'mRest-1',
        }
      },
      "@xml:id": "staff-1",
      "@n": "1"
    },
    "@xml:id": "measure-" + mIdx,
    "@n": mIdx
  };
  chords.forEach(function(chord, idx) {
    if (chord !== '') {
      harm.push({
        "rend": chord,
        "@place": "above",
        "@staff": "1",
        "@tstamp": (idx * 2 + 1).toString(),
      });
    }
  });
  return measure;
}

function createMeiXml(chords) {
  var cleanedChords = [];
  chords.forEach(function(chord) {
    if (chord && chord[0] != ';') {
      cleanedChords.push(chord);
    }
  });
  var measures = createMeasures(cleanedChords);
  return x2js.json2xml_str(createMei(measures));
}