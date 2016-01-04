package de.treichels.wea.bat64;

import java.io.File;
import java.io.FileInputStream;
import java.util.Map.Entry;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.XMLReader;

public class SAXTest implements ContentHandler, ErrorHandler {
	public static void main(final String[] args) throws Exception {
		final File file = new File(args[0]);

		final SAXParserFactory factory = SAXParserFactory.newInstance();
		factory.setNamespaceAware(true);
		final SAXParser parser = factory.newSAXParser();
		final XMLReader reader = parser.getXMLReader();
		reader.setContentHandler(new SAXTest());

		try (final FileInputStream fis = new FileInputStream(file)) {
			reader.parse(new InputSource(fis));
		}
	}

	private SortedMap<String, Integer> tags;
	private SortedMap<String, Integer> attributes;

	@Override
	public void characters(final char[] ch, final int start, final int length) throws SAXException {
	}

	@Override
	public void endDocument() throws SAXException {
		for (final Entry<String, Integer> entry : tags.entrySet()) {
			System.out.printf("tag \"%s\" : %d\n", entry.getKey(), entry.getValue());
		}
		for (final Entry<String, Integer> entry : attributes.entrySet()) {
			System.out.printf("attribute \"%s\" : %d\n", entry.getKey(), entry.getValue());
		}
	}

	@Override
	public void endElement(final String uri, final String localName, final String qName) throws SAXException {
	}

	@Override
	public void endPrefixMapping(final String prefix) throws SAXException {
	}

	@Override
	public void error(final SAXParseException exception) throws SAXException {
		System.err.printf("URI=%s Line=%d: %s\n", exception.getSystemId(), exception.getLineNumber(),
				exception.getMessage());
	}

	@Override
	public void fatalError(final SAXParseException exception) throws SAXException {
		System.err.printf("URI=%s Line=%d: %s\n", exception.getSystemId(), exception.getLineNumber(),
				exception.getMessage());
	}

	@Override
	public void ignorableWhitespace(final char[] ch, final int start, final int length) throws SAXException {
	}

	@Override
	public void processingInstruction(final String target, final String data) throws SAXException {
	}

	@Override
	public void setDocumentLocator(final Locator locator) {
	}

	@Override
	public void skippedEntity(final String name) throws SAXException {
	}

	@Override
	public void startDocument() throws SAXException {
		tags = new TreeMap<String, Integer>();
		attributes = new TreeMap<String, Integer>();
	}

	@Override
	public void startElement(final String uri, final String localName, final String qName, final Attributes attrs)
			throws SAXException {
		String key = localName;
		int value;

		if (tags.containsKey(key)) {
			value = tags.get(key) + 1;
		} else {
			value = 1;
		}

		tags.put(key, value);

		final int count = attrs.getLength();
		for (int i = 0; i < count; i++) {
			key = attrs.getLocalName(i);

			if (attributes.containsKey(key)) {
				value = attributes.get(key) + 1;
			} else {
				value = 1;
			}

			attributes.put(key, value);
		}
	}

	@Override
	public void startPrefixMapping(final String prefix, final String uri) throws SAXException {
	}

	@Override
	public void warning(final SAXParseException exception) throws SAXException {
		System.err.printf("URI=%s Line=%d: %s\n", exception.getSystemId(), exception.getLineNumber(),
				exception.getMessage());
	}
}
