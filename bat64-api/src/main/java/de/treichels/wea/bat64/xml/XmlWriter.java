package de.treichels.wea.bat64.xml;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;

import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamResult;

public class XmlWriter {
	private static final String TYPEINFO = "typeinfo";
	private static final XMLOutputFactory XML_OUTPUT_FACTORY = XMLOutputFactory.newFactory();

	public String toString(final XmlElement element) throws XMLStreamException {
		try (StringWriter stringWriter = new StringWriter()) {
			write(element, stringWriter);
			return stringWriter.toString();
		} catch (final IOException e) {
			throw new XMLStreamException(e);
		}
	}

	public void write(final XmlElement element, final File file) throws XMLStreamException {
		try (OutputStream outputStream = new FileOutputStream(file)) {
			write(element, outputStream);
		} catch (final IOException e) {
			throw new XMLStreamException(e);
		}
	}

	public void write(final XmlElement element, final OutputStream outputStream) throws XMLStreamException, UnsupportedEncodingException {
		try (Writer writer = new OutputStreamWriter(outputStream, "utf-8")) {
			write(element, writer);
		} catch (final IOException e) {
			throw new XMLStreamException(e);
		}
	}

	public void write(final XmlElement element, final Result result) throws XMLStreamException {
		XMLStreamWriter writer = null;

		try {
			writer = XML_OUTPUT_FACTORY.createXMLStreamWriter(result);
			writer.writeStartDocument("utf-8", "1.0");
			write(element, writer);
			writer.writeEndDocument();
			writer.close();
		} finally {
			if (writer != null) {
				writer.close();
			}
		}
	}

	public void write(final XmlElement element, final String fileName) throws XMLStreamException {
		write(element, new File(fileName));
	}

	public void write(final XmlElement element, final Writer writer) throws XMLStreamException {
		write(element, new StreamResult(writer));
	}

	private void write(final XmlElement element, final XMLStreamWriter writer) throws XMLStreamException {
		final String tagName = element.getName();
		final String typeinfo = Integer.toString(element.getTypeinfo());

		if (element.hasText()) {
			writer.writeStartElement(tagName);
			writer.writeAttribute(TYPEINFO, typeinfo);
			writer.writeCharacters(element.getText());
			writer.writeEndElement();
		} else if (element.isEmpty()) {
			writer.writeEmptyElement(tagName);
			writer.writeAttribute(TYPEINFO, typeinfo);
		} else {
			writer.writeStartElement(tagName);
			writer.writeAttribute(TYPEINFO, typeinfo);
			for (final XmlElement child : element.values()) {
				write(child, writer);
			}
			writer.writeEndElement();
		}
	}
}
