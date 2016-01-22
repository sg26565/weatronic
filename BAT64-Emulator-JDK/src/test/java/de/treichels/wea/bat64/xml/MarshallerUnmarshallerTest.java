package de.treichels.wea.bat64.xml;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.transform.Source;

import org.hamcrest.Description;
import org.hamcrest.StringDescription;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.xmlunit.builder.Input;
import org.xmlunit.matchers.CompareMatcher;

import de.treichels.wea.bat64.gen.Root;

public class MarshallerUnmarshallerTest {
	private final XmlReader reader = new XmlReader();
	private final XmlWriter writer = new XmlWriter();

	@DataProvider(name = "models")
	public Iterator<Object[]> getModels() {
		final List<Object[]> modelFiles = new ArrayList<Object[]>();

		for (final File file : new File(".").listFiles()) {
			if (file.getName().endsWith(".model")) {
				modelFiles.add(new Object[] { file });
			}
		}

		return modelFiles.iterator();
	}

	@Test(dataProvider = "models")
	public void testEquals(final File file) throws Exception {
		// read xml
		final XmlElement inRootElement = reader.read(file);

		// unmarshall
		final Root root = new Root();
		Unmarshaller.unmarshal(inRootElement, root, null);

		// marshall
		final XmlElement outRootElement = new XmlElement("root", 32, null);
		Marshaller.marshal(root, outRootElement);

		// compare XmlElement trees
		assertEquals(inRootElement, outRootElement);

		// write xml
		final ByteArrayOutputStream os = new ByteArrayOutputStream();
		writer.write(outRootElement, os);

		final Source input = Input.fromFile(file).build();
		final Source output = Input.fromByteArray(os.toByteArray()).build();

		// compare xml files
		final CompareMatcher matcher = CompareMatcher.isIdenticalTo(input).ignoreWhitespace().withDifferenceEvaluator(new TextDifferenceEvaluator());
		if (!matcher.matches(output)) {
			final Description description = new StringDescription();
			matcher.describeTo(description);
			fail(description.toString());
		}
	}
}
