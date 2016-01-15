package de.treichels.wea.bat64.xml;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.util.Stack;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;

public class XmlReader {
	private static final String TYPEINFO = "typeinfo";
	private static final XMLInputFactory XML_INPUT_FACTORY = XMLInputFactory.newFactory();

	public XmlElement parse(final String content) throws XMLStreamException {
		try (final Reader r = new StringReader(content)) {
			return read(r);
		} catch (final IOException e) {
			throw new XMLStreamException(e);
		}
	}

	public XmlElement read(final File file) throws XMLStreamException {
		try (InputStream inputStream = new FileInputStream(file)) {
			return read(inputStream);
		} catch (final IOException e) {
			throw new XMLStreamException(e);
		}
	}

	public XmlElement read(final InputStream is) throws XMLStreamException {
		return read(new StreamSource(is));
	}

	public XmlElement read(final Reader reader) throws XMLStreamException {
		return read(new StreamSource(reader));
	}

	public XmlElement read(final Source source) throws XMLStreamException {
		final Stack<XmlElement> stack = new Stack<XmlElement>();
		XMLStreamReader reader = null;
		XmlElement rootElement = null;

		try {
			reader = XML_INPUT_FACTORY.createXMLStreamReader(source);
			while (reader.hasNext()) {
				switch (reader.next()) {
				case XMLStreamConstants.START_ELEMENT:
					final String tagName = reader.getLocalName();
					final int typeinfo = Integer.parseInt(reader.getAttributeValue(null, TYPEINFO));
					final XmlElement newElement = new XmlElement(tagName, typeinfo,
							stack.isEmpty() ? null : stack.peek());

					if (stack.isEmpty()) {
						rootElement = newElement;
					} else {
						final XmlElement parent = stack.peek();
						parent.put(tagName, newElement);
					}

					stack.push(newElement);
					break;

				case XMLStreamConstants.CHARACTERS:
					if (!reader.isWhiteSpace()) {
						final XmlElement element = stack.peek();
						element.setText(reader.getText().trim());
					}
					break;

				case XMLStreamConstants.END_ELEMENT:
					stack.pop();
				}
			}
		} finally {
			if (reader != null) {
				reader.close();
			}
		}

		return rootElement;
	}

	public XmlElement read(final String fileName) throws XMLStreamException {
		return read(new File(fileName));
	}
}
